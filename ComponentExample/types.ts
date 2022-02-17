import { TRadius, Undefinable } from 'types/common';
import { IChartColor } from 'styles/types';

import { TDateRangeSelectedValue } from 'components/interaction/DateRangeSelect/types';

export type THTEChartType = 'line' | 'bar';

export type GenericDataBase = Record<string, any>;

export type THTEChartData<GenericData> = Array<GenericData>;

type TTooltipContentProps<GenericData extends GenericDataBase> = GenericData & {
    chartType: THTEChartType;
};

export type TTooltipContent<GenericData> = (
    props: TTooltipContentProps<GenericData>,
) => JSX.Element | null;

export interface IHTEChartAttrsItem<GenericData> {
    title: string;
    dataKey: keyof GenericData;
    color: IChartColor;
    bar?: {
        radius?: TRadius;
        maxHeight?: number;
    };
}

export type THTEChartAttrs<GenericData> = Array<IHTEChartAttrsItem<GenericData>>;

export interface IHTEChart<GenericData extends GenericDataBase> {
    data: THTEChartData<GenericData>;
    attrs: THTEChartAttrs<GenericData>;
    height?: number;
    dataKey: keyof GenericData;
    currency: string;
    tooltipContent?: TTooltipContent<GenericData>;
    period?: TDateRangeSelectedValue;
    setPeriod?: (period: TDateRangeSelectedValue) => void;
}

export type TUseChartType = (dataLength: number) => THTEChartType;

export type TUseTicksInterval = (
    period: Undefinable<TDateRangeSelectedValue>,
) => Undefinable<number>;

export type TUseTickFormater = (period: Undefinable<TDateRangeSelectedValue>) => any;
