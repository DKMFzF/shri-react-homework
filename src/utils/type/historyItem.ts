export type HistoryItem = {
  fileId: string;
  fileName: string;
  date: string;
  status: 'done' | 'error';
  data: string;
  lastUpdated: number;
};