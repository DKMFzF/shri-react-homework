import { type ButtonProps } from './type';
import styles from './Button.module.css';

export const Button = ({ type, isActive=false, children }: ButtonProps) => {
  return (
    <button className={`
      ${styles.button}
      ${isActive
        ? styles['button_no-active']
        : type == 'send'
          ? styles.button_send
          : type == 'download'
            ? styles.button_download
            : type == 'clear'
              ? styles.button_clear
              : '' }
    `}>
      <div className={styles.button__wrapper}>
        {children}
      </div>
    </button>
  );
}
