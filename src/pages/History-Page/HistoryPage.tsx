import { useEffect, useState } from 'react';

import { type HistoryItem } from '../../utils/type/historyItem';
import { HistoryCard } from '../../components/ui';
import styles from './HistoryPage.module.css';

export const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
    
    const sortedHistory = savedHistory.sort((a: HistoryItem, b: HistoryItem) => 
      b.lastUpdated - a.lastUpdated
    );
    
    setHistory(sortedHistory);
  }, []);

  const handleDelete = (fileId: string) => {
    const newHistory = history.filter(item => item.fileId !== fileId);
    setHistory(newHistory);
    localStorage.setItem('analysisHistory', JSON.stringify(newHistory));
  };

  return (
    <div className={styles['history-page']}>
      {history.map((item, index) => (
        <HistoryCard
          key={index}
          fileName={item.fileName}
          data={item.date}
          status={item.status}
          onClick={() => handleDelete(item.fileId)}
        />
      ))}
      {history.length === 0 && (
        <div className={styles['history-page__empty']}>
          История анализов пуста
        </div>
      )}
    </div>
  );
};
