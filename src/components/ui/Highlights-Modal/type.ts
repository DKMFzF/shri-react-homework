import type { ReactNode } from 'react';

export type HighlightsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};
