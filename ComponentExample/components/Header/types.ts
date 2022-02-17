import { TDateRangeSelectedValue } from 'components/interaction/DateRangeSelect/types';
import { GenericDataBase, THTEChartData, THTEChartAttrs } from 'components/charts/HTEChart/types';

/**
 * Интерфейс заголовка виджета Продаж.
 * @extends IHTEChart {@link IHTEChart}
 * @param settings настройки виджета {@link IHTEChartSettings}
 */
export interface IHTEChartHeader<GenericData extends GenericDataBase> {
    data: THTEChartData<GenericData>;
    attrs: THTEChartAttrs<GenericData>;
    period?: TDateRangeSelectedValue;
    setPeriod?: (period: TDateRangeSelectedValue) => void;
}
