import { useState } from 'react';

import { Button, ProcessBar } from '../../components/ui';
import { reportsApi } from '../../services/reportsApi';
import styles from './GeneratorPage.module.css';

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

  return (
    <div className={styles['generator-page']}>
      Сгенерируйте готовый csv-файл нажатием одной кнопки
      
      {error && <div className={styles.error}>{error}</div>}
      
      {downloadUrl ? (
        <a 
          href={downloadUrl} 
          download="report.csv"
          className={styles.downloadLink}
        >
          <Button type='download'>Скачать отчет</Button>
        </a>
      ) : !isLoading
          ? (
            <Button 
              type='send' 
              onClick={handleGenerate}
              disabled={isLoading}
            >
              Начать Генерацию
            </Button>
          )
          : (
            <>
              <ProcessBar />
              идёт процесс генерации
            </>
          ) 
      }
    </div>
  );
}
