import { describe, it, expect, vi, beforeEach } from 'vitest';
import { aggregateApi } from '../../api/aggregateApi';
import type { AggregatedData } from '../../utils/type/api';

import { handleSubmit } from '../handleSubmitAggregatedData';

// Мокаем весь модуль правильно
vi.mock('../../api/aggregateApi', () => ({
  aggregateApi: {
    aggregateData: vi.fn()
  }
}));

describe('handleSubmit', () => {
  const mockSetError = vi.fn();
  const mockSetIsLoading = vi.fn();
  const mockSetAggregatedData = vi.fn();
  const mockOnComplete = vi.fn();
  const mockFile = new File(['content'], 'test.csv', { type: 'text/csv' });

  beforeEach(() => {
    vi.clearAllMocks();
    (aggregateApi.aggregateData as any).mockReset();
  });

  it('should set error if no file provided', async () => {
    await handleSubmit(
      null,
      mockSetError,
      mockSetIsLoading,
      mockSetAggregatedData,
      mockOnComplete
    );

    expect(mockSetError).toHaveBeenCalledWith(true);
    expect(mockOnComplete).toHaveBeenCalledWith(false);
    expect(mockSetIsLoading).not.toHaveBeenCalled();
  });

  it('should call API and handle successful response', async () => {
    const mockData: AggregatedData = {
      total_spend_galactic: 100,
      rows_affected: 10
    };
    
    (aggregateApi.aggregateData as any).mockImplementation(
      async ({ onDataReceived }: { onDataReceived?: (data: string) => void }) => {
        if (onDataReceived) {
          onDataReceived(JSON.stringify(mockData));
        }
        return Promise.resolve('success');
      }
    );

    await handleSubmit(
      mockFile,
      mockSetError,
      mockSetIsLoading,
      mockSetAggregatedData,
      mockOnComplete
    );

    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
    expect(mockSetError).toHaveBeenCalledWith(false);
    expect(aggregateApi.aggregateData).toHaveBeenCalled();
    expect(mockOnComplete).toHaveBeenCalledWith(true);
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  it('should handle API error', async () => {
    (aggregateApi.aggregateData as any).mockRejectedValue(new Error('API error'));

    await expect(
      handleSubmit(
        mockFile,
        mockSetError,
        mockSetIsLoading,
        mockSetAggregatedData,
        mockOnComplete
      )
    ).rejects.toThrow('Ошибка обработки файла');

    expect(mockSetError).toHaveBeenCalledWith(true);
    expect(mockOnComplete).toHaveBeenCalledWith(false);
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });
});
