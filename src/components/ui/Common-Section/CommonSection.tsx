import { type CommonSectionProps } from './type';
import styles from './CommonSection.module.css';

export const CommonSection = ({ children }: CommonSectionProps) => {
  return (
    <section className={styles["common-section"]}>
      <div className={styles['common-section__wrapper-section']}>
        {children}
      </div>
    </section>
  );
}
