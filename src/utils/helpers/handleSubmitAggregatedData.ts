import { handleDataChunk } from './handleDataChunk';
import { type AggregatedData } from '../type/api';
import { aggregateApi } from '../../services/aggregateApi';

export const handleSubmit = async (
  file: File | null,
  setError: (error: boolean) => void,
  setIsLoading: (loading: boolean) => void,
  setAggregatedData: (data: AggregatedData | null) => void
) => {
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
      onDataReceived: (chunk) => handleDataChunk(chunk, setAggregatedData),
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