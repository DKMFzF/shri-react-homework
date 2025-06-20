import styles from './ButtonDelete.module.css';

type ButtonDeleteProps = {
  onClick?: () => void;
};

export const ButtonDelete = ({ onClick }: ButtonDeleteProps) => {
  return (
    <button className={styles['button-delete']} onClick={onClick}></button>
  );
}
