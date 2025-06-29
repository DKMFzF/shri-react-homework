import { renderHook } from '@testing-library/react';
import { describe, expect, vi, it, beforeEach } from 'vitest';
import { useDragAndDrop } from '../useDragAndDrop';
import { type UseDragAndDropProps } from '../type';

describe('useDragAndDrop', () => {
  const mockOnFilesSelected = vi.fn();
  const mockOnDragStateChange = vi.fn();

  const setup = (props: Partial<UseDragAndDropProps> = {}) => {
    const initialProps: UseDragAndDropProps = {
      onFilesSelected: mockOnFilesSelected,
      onDragStateChange: mockOnDragStateChange,
      ...props,
    };

    return renderHook(() => useDragAndDrop(initialProps));
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return ref and handlers', () => {
    const { result } = setup();

    expect(result.current.fileInputRef).toBeDefined();
    expect(result.current.handleButtonClick).toBeInstanceOf(Function);
    expect(result.current.handleFileChange).toBeInstanceOf(Function);
    expect(result.current.handleDrag).toBeInstanceOf(Function);
    expect(result.current.handleDrop).toBeInstanceOf(Function);
  });

  describe('handleButtonClick', () => {
    it('should trigger click on file input', () => {
      const { result } = setup();
      const mockClick = vi.fn();
      
      // Mock the input element
      result.current.fileInputRef.current = {
        click: mockClick,
      } as unknown as HTMLInputElement;

      result.current.handleButtonClick();
      
      expect(mockClick).toHaveBeenCalled();
    });

    it('should not throw if ref is null', () => {
      const { result } = setup();
      
      result.current.fileInputRef.current = null;
      
      expect(() => result.current.handleButtonClick()).not.toThrow();
    });
  });

  describe('handleFileChange', () => {
    it('should call onFilesSelected when files are selected', () => {
      const { result } = setup();
      const mockFiles = [new File(['content'], 'file.txt')];
      const mockEvent = {
        target: {
          files: mockFiles,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      result.current.handleFileChange(mockEvent);
      
      expect(mockOnFilesSelected).toHaveBeenCalledWith(mockFiles);
    });

    it('should not call onFilesSelected when no files are selected', () => {
      const { result } = setup();
      const mockEvent = {
        target: {
          files: null,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      result.current.handleFileChange(mockEvent);
      
      expect(mockOnFilesSelected).not.toHaveBeenCalled();
    });
  });

  describe('handleDrag', () => {
    it('should prevent default and stop propagation', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        type: 'dragenter',
      } as unknown as React.DragEvent;

      result.current.handleDrag(mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should call onDragStateChange with true for dragenter/dragover', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        type: 'dragenter',
      } as unknown as React.DragEvent;

      result.current.handleDrag(mockEvent);
      
      expect(mockOnDragStateChange).toHaveBeenCalledWith(true);
    });

    it('should call onDragStateChange with false for other events', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        type: 'dragleave',
      } as unknown as React.DragEvent;

      result.current.handleDrag(mockEvent);
      
      expect(mockOnDragStateChange).toHaveBeenCalledWith(false);
    });

    it('should not call onDragStateChange when not provided', () => {
      const { result } = setup({ onDragStateChange: undefined });
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        type: 'dragenter',
      } as unknown as React.DragEvent;

      result.current.handleDrag(mockEvent);
      
      expect(mockOnDragStateChange).not.toHaveBeenCalled();
    });
  });

  describe('handleDrop', () => {
    it('should prevent default and stop propagation', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: { files: [] },
      } as unknown as React.DragEvent;

      result.current.handleDrop(mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should call onDragStateChange with false', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: { files: [] },
      } as unknown as React.DragEvent;

      result.current.handleDrop(mockEvent);
      
      expect(mockOnDragStateChange).toHaveBeenCalledWith(false);
    });

    it('should call onFilesSelected when files are present', () => {
      const { result } = setup();
      const mockFiles = [new File(['content'], 'file.txt')];
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: { files: mockFiles },
      } as unknown as React.DragEvent;

      result.current.handleDrop(mockEvent);
      
      expect(mockOnFilesSelected).toHaveBeenCalledWith(mockFiles);
    });

    it('should not call onFilesSelected when no files are present', () => {
      const { result } = setup();
      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: { files: [] },
      } as unknown as React.DragEvent;

      result.current.handleDrop(mockEvent);
      
      expect(mockOnFilesSelected).not.toHaveBeenCalled();
    });
  });
});
