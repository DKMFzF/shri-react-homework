import { Link } from 'react-router-dom';

import { type AppHeaderNavLinkProps } from './type';
import styles from './AppHeaderNavLink.module.css';

export const AppHeaderNavLink = ({
  url,
  pathImg,
  altImg,
  text,
  stylesClass = ''
}: AppHeaderNavLinkProps) => (
  <Link
    to={url}
    role="button"
    className={styles['header__nav-link-wrapper']}
  >
    <img
      src={pathImg}
      alt={altImg}
      loading='lazy'
      decoding='async'
    />
    <span className={`${stylesClass}`}>
      {text}
    </span>
  </Link>
);
