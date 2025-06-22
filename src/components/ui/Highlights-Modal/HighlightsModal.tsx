import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ButtonDeleteUI } from '../';

import { type HighlightsModalProps } from './type';
import styles from './HighlightsModal.module.css';

export const HighlightsModal: React.FC<HighlightsModalProps> = ({
  isOpen,
  onClose,
  children,
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
    <div className={styles.modal__overlay} onClick={onClose}>
      <div>
        <div className={styles['modal__cloase-btn']}>
          <ButtonDeleteUI onDelete={onClose}></ButtonDeleteUI>
        </div>
        <div
          className={styles['modal__modal-content']}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
};
