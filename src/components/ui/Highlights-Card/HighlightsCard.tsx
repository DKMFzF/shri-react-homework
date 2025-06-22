import { type HighlightsCardUIProps } from './type';
import styles from './HighlightsCard.module.css';

export const HighlightsCardUI = ({
  meaning,
  description,
}: HighlightsCardUIProps) => {
  return (
    <article className={styles['highlights-card']}>
      <div className={styles['highlights-card__meaning']}>{meaning}</div>
      <div>{description}</div>
    </article>
  );
}
