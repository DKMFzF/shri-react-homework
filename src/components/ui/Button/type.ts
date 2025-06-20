import type { ReactNode } from 'react';
import { type CommonBtnProps } from '../../../utils/type/button';

type ButtonTypes = 'send' | 'download' | 'clear';
export type ButtonProps = CommonBtnProps<ButtonTypes> & {
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}
