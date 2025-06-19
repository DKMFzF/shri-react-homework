import { type CommonPageProps } from './type';
import styles from './CommonPage.module.css';

export const CommonPage = ({ children }: CommonPageProps) => {
  return (
    <div className={styles['common-page']}>
      <div className={styles['common-page__content-wrapper']}>
        {children}
      </div>
    </div>
  );
}
