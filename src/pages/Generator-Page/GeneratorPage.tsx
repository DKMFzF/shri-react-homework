import { Button } from '../../components/ui';
import styles from './GeneratorPage.module.css';

export const GeneratorPage = () => {
  return (
      <div className={styles['generator-page']}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
        <Button type='send'>Начать Генерацию</Button>
      </div>
  );
}
