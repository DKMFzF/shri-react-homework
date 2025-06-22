import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './HighlightsModal.module.css'; // Создайте этот файл

interface HighlightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const HighlightsModal: React.FC<HighlightsModalProps> = ({ 
  isOpen, 
  onClose, 
  children 
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
