import { Link } from 'react-router-dom';

import { type AppHeaderNavLinkProps } from './type';
import styles from './AppHeaderNavLink.module.css';

export const AppHeaderNavLink = ({
  url,
  pathImg,
  altImg,
  text,
  stylesClass = '',
  isActive
}: AppHeaderNavLinkProps) => {
  
  return (
    <Link
      to={url}
      role="button"
      className={`
        ${styles['header__nav-link-wrapper']}
        ${isActive
          ? styles['header__nav-link-wrapper_active']
          : ''}`
      }
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
  )
};
