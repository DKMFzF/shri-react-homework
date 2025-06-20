import { type ButtonUploadProps } from './type';
import styles from './ButtonUpload.module.css';

export const ButtonUpload = ({
  children,
}: ButtonUploadProps) => {
  return (
    <button className={styles['button-upload']}>
      {children}
    </button>
  );
}
