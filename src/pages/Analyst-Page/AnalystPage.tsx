import { useState } from 'react';

import { AnalystDragAndDrop } from '../../components';
import { ButtonUI } from '../../components/ui';
import { useFileStore } from '../../stories';
import { aggregateApi } from '../../services/aggregateApi';

import styles from './AnalystPage.module.css';

export const AnalystPage = () => {
  const isUploaded = useFileStore((state) => state.isUploaded);
  const file = useFileStore((state) => state.file);
  const reset = useFileStore((state) => state.reset);
  const [responseData, setResponseData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleDataChunk = (chunk: string) => {
    try {
      const parsed = JSON.parse(chunk);
      setResponseData(JSON.stringify(parsed, null, 2));
    } catch {
      setResponseData(chunk);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);
    setResponseData('');

    try {
      await aggregateApi.aggregateData({
        rows: 10000,
        file: file,
        onDataReceived: handleDataChunk,
      });
    } catch (err) {
      setError(true);
      console.log(err instanceof Error ? err.message : 'Плаки плаки(');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setError(false);
    setResponseData('');
  };

  return (
    <div className={styles['analyst-page']}>
      <div className={styles['analyst-page__controller']}>
        <span className={styles["analyst-page__description-text"]}>
          Загрузите{" "}
          <span className={styles["analyst-page__bold-text"]}>csv</span>{" "}
          файл и получите{" "}
          <span className={styles["analyst-page__bold-text"]}>
            полную информацию
          </span>{" "}
          о нём за сверхнизкое время
        </span>

        <AnalystDragAndDrop
          onReset={handleReset}
          showErrorStatus={error}
          isLoading={isLoading}
        />

        {!error && !isLoading && (
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

      <div className={`${styles['analyst-page__highlights']} ${!responseData ? styles['analyst-page__highlights_none'] : ''}`}>
        {responseData ? (
          <>{responseData}</>
        ) : (
          <div className={styles['analyst-page__none-text']}>
            Здесь <span className={styles['analyst-page__none-text_nowrap']}>появятся хайлайты</span>
          </div>
        )}
      </div>
    </div>
  );
}
