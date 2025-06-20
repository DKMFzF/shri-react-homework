import { type CommonBtnProps } from '../../../utils/type/button';

type ButtonTypes = 'send' | 'download' | 'clear';
export type ButtonProps = CommonBtnProps<ButtonTypes> & {
  isActive?: boolean;
  children: string;
}
