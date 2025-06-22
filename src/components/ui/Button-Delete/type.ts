type ButtonVersionType = 'default' | 'trash';
export type ButtonDeleteUIProps = {
  version?: ButtonVersionType;
  onClick?: () => void;
};
