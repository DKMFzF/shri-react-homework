import { describe, it, expect, vi } from 'vitest';
import { handleDataChunk } from '../handleDataChunk';
import type { AggregatedData } from '../../utils/type/api';

describe('handleDataChunk', () => {
  it('should correctly parse and set aggregated data for valid chunk with multiple JSONs', () => {
    const mockSetAggregatedData = vi.fn();
    const validChunk = `{"total": 50} {"total_spend_galactic": 100, "rows_affected": 10}`;
    const expectedData: AggregatedData = {
      total_spend_galactic: 100,
      rows_affected: 10
    };

    handleDataChunk(validChunk, mockSetAggregatedData);

    expect(mockSetAggregatedData).toHaveBeenCalledWith(expectedData);
  });

  it('should not call setAggregatedData for single JSON chunk', () => {
    const mockSetAggregatedData = vi.fn();
    const singleJsonChunk = `{"total_spend_galactic": 100, "rows_affected": 10}`;

    handleDataChunk(singleJsonChunk, mockSetAggregatedData);

    expect(mockSetAggregatedData).not.toHaveBeenCalled();
  });

  it('should throw error for invalid chunk', () => {
    const mockSetAggregatedData = vi.fn();
    const invalidChunk = 'invalid json { not valid }';

    expect(() => handleDataChunk(invalidChunk, mockSetAggregatedData)).toThrow('Ошибка обработк чанка');
    expect(mockSetAggregatedData).not.toHaveBeenCalled();
  });

  it('should handle empty chunk', () => {
    const mockSetAggregatedData = vi.fn();
    const emptyChunk = '';

    expect(() => handleDataChunk(emptyChunk, mockSetAggregatedData)).not.toThrow();
    expect(mockSetAggregatedData).not.toHaveBeenCalled();
  });
});
