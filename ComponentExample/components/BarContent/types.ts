import { IHTEChart, GenericDataBase } from '../../types';

// export type TGetBarPropData = (
//     shapeProps: any,
//     maxValue: number,
//     chartItem: THTEChartAttrs,
// ) => IMultiBarItem;

export type TGetBarPadding = (x: number, index: number, width: number) => number;

export type TGetBarYCenter = (
    value: number,
    maxValue: number,
    chartHeight: number,
    maxBarHeight: number,
) => number;

export interface IHTEBarChart<GenericData extends GenericDataBase> extends IHTEChart<GenericData> {
    minWidth?: number;
}
