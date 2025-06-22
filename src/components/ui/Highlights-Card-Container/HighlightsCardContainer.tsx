import { getMonthAndDay } from '../../../utils/helpers/monthAndDay';
import { HighlightsCardUI } from '../';
import { type HighlightsCardContainerUIProps } from './type';

export const HighlightsCardContainerUI = ({ aggregatedData }: HighlightsCardContainerUIProps) => {
  return (
    <>
      <HighlightsCardUI
        meaning={aggregatedData.total_spend_galactic.toLocaleString()}
        description="общие расходы в галактических кредитах"
      />
      {aggregatedData.less_spent_civ && (
        <HighlightsCardUI
          meaning={aggregatedData.less_spent_civ}
          description="цивилизация с минимальными расходами"
        />
      )}
      <HighlightsCardUI
        meaning={aggregatedData.rows_affected.toLocaleString()}
        description="количество обработанных записей"
      />
      {aggregatedData.big_spent_at !== undefined && (
        <HighlightsCardUI
          meaning={getMonthAndDay(aggregatedData.big_spent_at)}
          description="день года с максимальными расходами"
        />
      )}
      {aggregatedData.less_spent_at !== undefined && (
        <HighlightsCardUI
          meaning={getMonthAndDay(aggregatedData.less_spent_at)}
          description="день года с минимальными расходами"
        />
      )}
      {aggregatedData.big_spent_value !== undefined && (
        <HighlightsCardUI
          meaning={aggregatedData.big_spent_value.toLocaleString()}
          description="максимальная сумма расходов за день"
        />
      )}
      {aggregatedData.big_spent_civ && (
        <HighlightsCardUI
          meaning={aggregatedData.big_spent_civ}
          description="цивилизация с максимальными расходами"
        />
      )}
      {aggregatedData.average_spend_galactic !== undefined && (
        <HighlightsCardUI
          meaning={aggregatedData.average_spend_galactic.toLocaleString()}
          description="средние расходы в галактических кредитах"
        />
      )}
    </>
  );
}
