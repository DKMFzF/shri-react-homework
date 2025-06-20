import { ButtonDelete } from '../';
import { type StatusContentProps } from './type';
import styles from './StatusContent.module.css';

export const StatusContent = ({
  status,
  statusText,
  descriptionText
}: StatusContentProps) => {
  return (
    <div className={styles['status-content']}>
      <div className={styles["status-content__controls"]}>
        <div
          className={`
            ${styles["status-content__process-status"]}
            ${status == 'done'
              ? styles["status-content__process-status_done"]
              : styles["status-content__process-status_error"]
            }
          `}
        >
          {statusText}
        </div>
        <ButtonDelete />
      </div>
      <div className={`
        ${styles['status-content__description-text']}
        ${status === 'error'
          ? styles['status-content__description-text_error']
          : ''}
        `}>
        {descriptionText}
      </div>
    </div>
  );
}
