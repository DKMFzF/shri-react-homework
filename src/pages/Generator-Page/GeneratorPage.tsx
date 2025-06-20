import { useEffect } from "react";
import { Button, ProcessBar, StatusContent } from "../../components/ui";
import { reportsApi } from "../../services/reportsApi";
import styles from "./GeneratorPage.module.css";
import { useGeneratorStore } from "../../stories/generatorStore/generatorStore";

export const GeneratorPage = () => {
  const {
    isLoading,
    error,
    downloadUrl,
    setLoading,
    setError,
    setDownloadUrl,
    reset
  } = useGeneratorStore();

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const reportData = await reportsApi.generateReport({
        size: 0.100,
        withErrors: false,
        maxSpend: 1000
      });

      const blob = new Blob([reportData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'generation.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    reset();
  };

  if (error) {
    return (
      <div className={styles['generator-page']}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
        <StatusContent
          status="error"
          statusText="Ошибка"
          descriptionText="упс, не то..."
          onDelete={handleDelete}
        />
      </div>
    );
  }

  return (
    <div className={styles['generator-page']}>
      Сгенерируйте готовый csv-файл нажатием одной кнопки
      
      {downloadUrl ? (
        <>
          <StatusContent 
            status="done" 
            statusText="Done!" 
            descriptionText="файл сгенерирован!" 
            onDelete={handleDelete}
          />
        </>
      ) : !isLoading ? (
        <Button type="send" onClick={handleGenerate} disabled={isLoading}>
          Начать Генерацию
        </Button>
      ) : (
        <>
          <ProcessBar />
          идёт процесс генерации
        </>
      )}
    </div>
  );
};
