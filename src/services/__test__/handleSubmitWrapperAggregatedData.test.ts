import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { handleSubmitWrapper } from '../handleSubmitWrapperAggregatedData';
import { handleSubmit } from '../handleSubmitAggregatedData';
import type { AggregatedData } from '../../utils/type/api';

vi.mock('../handleSubmitAggregatedData');

describe('handleSubmitWrapper', () => {
  const mockSetError = vi.fn();
  const mockSetIsLoading = vi.fn();
  const mockSetAggregatedData = vi.fn();
  const mockFile = new File(['content'], 'test.csv', { type: 'text/csv' });

  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
  };

  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock);
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should not proceed if no file provided', async () => {
    await handleSubmitWrapper(
      null,
      mockSetError,
      mockSetIsLoading,
      mockSetAggregatedData
    );

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('should call handleSubmit and update localStorage on success', async () => {
    const mockData: AggregatedData = {
      total_spend_galactic: 100,
      rows_affected: 10
    };
    
    // Настраиваем мок для handleSubmit
    (handleSubmit as Mock).mockImplementation(async (
      _file, _setError, _setIsLoading, setData, onComplete
    ) => {
      setData(mockData);
      onComplete?.(true);
      return Promise.resolve();
    });

    await handleSubmitWrapper(
      mockFile,
      mockSetError,
      mockSetIsLoading,
      mockSetAggregatedData
    );

    expect(handleSubmit).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalled();
    
    const [key, value] = localStorageMock.setItem.mock.calls[0];
    expect(key).toBe('analysisHistory');
    const history = JSON.parse(value);
    expect(history[0].status).toBe('done');
    expect(history[0].data).toEqual(mockData);
    expect(history[0].fileName).toBe('test.csv');
  });

  it('should update localStorage with error status on failure', async () => {
    (handleSubmit as Mock).mockImplementation(async (
      _file, _setError, _setIsLoading, _setData, onComplete
    ) => {
      onComplete?.(false);
      return Promise.resolve();
    });

    await handleSubmitWrapper(
      mockFile,
      mockSetError,
      mockSetIsLoading,
      mockSetAggregatedData
    );

    expect(localStorageMock.setItem).toHaveBeenCalled();
    const [_, value] = localStorageMock.setItem.mock.calls[0];
    const history = JSON.parse(value);
    expect(history[0].status).toBe('error');
    expect(history[0].data).toBeNull();
  });
});
