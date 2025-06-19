import { type CommonPageProps } from './type';
import styles from './CommonPage.module.css';

export const CommonPage = ({ children }: CommonPageProps) => {
  return (
    <main className={styles['common-page']}>
      {children}
    </main>
  );
}
