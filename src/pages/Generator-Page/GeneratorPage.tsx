import { useState } from "react";

import { Button, ProcessBar, StatusContent } from "../../components/ui";
import { reportsApi } from "../../services/reportsApi";
import styles from "./GeneratorPage.module.css";

export const GeneratorPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className={styles['generator-page']}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
        <StatusContent status="error" statusText="Ошибка" descriptionText="упс, не то..." />
      </div>
    );
  }

  return (
    <div className={styles['generator-page']}>
      Сгенерируйте готовый csv-файл нажатием одной кнопки
      
      {downloadUrl ? (
        <>
          <StatusContent status="done" statusText="Done!" descriptionText="файл сгенерирован!" />
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
