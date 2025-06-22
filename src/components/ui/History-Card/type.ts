export type StatusCard = 'done' | 'error';
export type HistoryCardProps = {
  fileName: string;
  data: string,
  status: StatusCard;
  onClick: (() => void) | undefined;
}
