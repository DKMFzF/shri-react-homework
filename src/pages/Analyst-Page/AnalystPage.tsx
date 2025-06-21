import { AnalystDragAndDrop, Button } from '../../components/ui';
import styles from './AnalystPage.module.css';
import { useFileStore } from '../../stories';

export const AnalystPage = () => {
  const isUploaded = useFileStore((state) => state.isUploaded);

  return (
    <div className={styles['analyst-page']}>
      <div className={styles['analyst-page__controller']}>
        <span className={styles["analyst-page__description-text"]}>
          Загрузите{" "}
          <span className={styles["analyst-page__bold-text"]}>csv</span>{" "}
          файл и получите{" "}
          <span className={styles["analyst-page__bold-text"]}>
            полную информацию
          </span>{" "}
          о нём за сверхнизкое время
        </span>

        <AnalystDragAndDrop />

        <Button type="send" isActive={!isUploaded}>
          Отправить
        </Button>
      </div>

      <div className={`${styles['analyst-page__highlights']} ${styles['analyst-page__highlights_none']}`}>
        <div className={styles['analyst-page__none-text']}>
          Здесь <span className={styles['analyst-page__none-text_nowrap']}>появятся хайлайты</span>
        </div>
      </div>
    </div>
  );
}
