import { type AggregatedData } from "../../utils/type/api";
import { AnalystDragAndDrop } from "../../components";
import { ButtonUI, HighlightsCardUI } from "../../components/ui";
import { useAnalystStore, useFileStore } from "../../stories";
import { aggregateApi } from "../../services/aggregateApi";

import styles from "./AnalystPage.module.css";

export const AnalystPage = () => {
  const isUploaded = useFileStore((state) => state.isUploaded);
  const file = useFileStore((state) => state.file);
  const resetFileStore = useFileStore((state) => state.reset);

  const {
    aggregatedData,
    isLoading,
    error,
    setAggregatedData,
    setIsLoading,
    setError,
    reset,
  } = useAnalystStore();

  const handleDataChunk = (chunk: string) => {
    try {
      const jsonStrings = chunk.trim().split(/\s(?={)/);

      if (jsonStrings.length > 1) {
        const lastJsonString = jsonStrings[jsonStrings.length - 1];
        const parsed = JSON.parse(lastJsonString) as AggregatedData;
        setAggregatedData(parsed);
      }
    } catch (err) {
      console.error("Failed to parse chunk:", err);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);
    setAggregatedData(null);

    try {
      await aggregateApi.aggregateData({
        rows: 10000,
        file: file,
        onDataReceived: handleDataChunk,
      });
    } catch (err) {
      setError(true);
      console.log(
        err instanceof Error ? err.message : "Ошибка обработки файла"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getStatus = () => {
    if (error) return "error";
    if (isLoading) return "processing";
    if (aggregatedData) return "done";
    if (file) return "default";
    return "empty";
  };

  const handleReset = () => {
    resetFileStore();
    reset();
  };

  return (
    <div className={styles["analyst-page"]}>
      <div className={styles["analyst-page__controller"]}>
        <span className={styles["analyst-page__description-text"]}>
          Загрузите{" "}
          <span className={styles["analyst-page__bold-text"]}>csv</span> файл и
          получите{" "}
          <span className={styles["analyst-page__bold-text"]}>
            полную информацию
          </span>{" "}
          о нём за сверхнизкое время
        </span>

        <AnalystDragAndDrop
          onReset={handleReset}
          status={getStatus()}
          isLoading={isLoading}
        />

        {!error && !isLoading && !aggregatedData && (
          <ButtonUI
            type="send"
            isActive={!isUploaded}
            onClick={handleSubmit}
            disabled={isLoading || error}
          >
            Отправить
          </ButtonUI>
        )}
      </div>

      <div
        className={`
        ${
          !aggregatedData
            ? styles["analyst-page__highlights_none"]
            : styles["analyst-page__highlights"]
        }`}
      >
        {aggregatedData ? (
          <>
            <HighlightsCardUI
              meaning={aggregatedData.total_spend_galactic.toLocaleString()}
              description="общие расходы в галактических кредитах"
            />
            <HighlightsCardUI
              meaning={aggregatedData.rows_affected.toLocaleString()}
              description="количество обработанных записей"
            />
            {aggregatedData.less_spent_at !== undefined && (
              <HighlightsCardUI
                meaning={aggregatedData.less_spent_at.toString()}
                description="день года с минимальными расходами"
              />
            )}
            {aggregatedData.big_spent_civ && (
              <HighlightsCardUI
                meaning={aggregatedData.big_spent_civ}
                description="цивилизация с максимальными расходами"
              />
            )}
            {aggregatedData.less_spent_civ && (
              <HighlightsCardUI
                meaning={aggregatedData.less_spent_civ}
                description="цивилизация с минимальными расходами"
              />
            )}
            {aggregatedData.big_spent_at !== undefined && (
              <HighlightsCardUI
                meaning={aggregatedData.big_spent_at.toString()}
                description="день года с максимальными расходами"
              />
            )}
            {aggregatedData.big_spent_value !== undefined && (
              <HighlightsCardUI
                meaning={aggregatedData.big_spent_value.toLocaleString()}
                description="максимальная сумма расходов за день"
              />
            )}
            {aggregatedData.average_spend_galactic !== undefined && (
              <HighlightsCardUI
                meaning={aggregatedData.average_spend_galactic.toLocaleString()}
                description="средние расходы в галактических кредитах"
              />
            )}
          </>
        ) : (
          <div className={styles["analyst-page__none-text"]}>
            Здесь{" "}
            <span className={styles["analyst-page__none-text_nowrap"]}>
              появятся хайлайты
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
