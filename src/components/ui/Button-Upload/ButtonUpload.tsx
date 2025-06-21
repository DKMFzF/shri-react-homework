import { type ButtonUploadProps } from './type';
import styles from './ButtonUpload.module.css';

export const ButtonUpload = ({
  children,
  onClick,
}: ButtonUploadProps & { onClick?: () => void }) => {
  return (
    <button className={styles['button-upload']} onClick={onClick}>
      {children}
    </button>
  );
}