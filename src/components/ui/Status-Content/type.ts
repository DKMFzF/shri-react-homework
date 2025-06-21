
type StatusTypes = 'default' | 'done' | 'error';
export type StatusContentProps = {
  status?: StatusTypes;
  statusText: string;
  descriptionText: string;
  onDelete?: () => void;
}
