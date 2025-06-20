
type StatusTypes = 'done' | 'error';
export type StatusContentProps = {
  status: StatusTypes;
  statusText: string;
  descriptionText: string;
}
