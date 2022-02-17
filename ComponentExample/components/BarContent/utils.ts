import * as T from './types';

import { IHTEChartAttrsItem, GenericDataBase } from 'components/charts/HTEChart/types';
import { DEFAULT_BAR_RADIUS } from 'components/charts/HTEChart/const';

/**
 * Функция, которая формирует набор данных {@link IMultiBarItem} для каждого столбца атрибута bar-графика
 * @param shapeProps объект, который передает Reacharts в каждый отдельный столбец bar-графика
 * @param maxValue максимальное значение среди всех столбцов атрибута bar-графика
 * @param attrSettings настройки атрибута bar-графика {@link ISellsChartAttrSettings}
 */
export const getBarPropData = <GenericData extends GenericDataBase>(
    shapeProps: any,
    maxValue: number,
    chartHeight: number,
    attrSettings: IHTEChartAttrsItem<GenericData>,
) => {
    return {
        value: shapeProps[attrSettings.dataKey],
        color: attrSettings.color,
        radius: attrSettings.bar?.radius || DEFAULT_BAR_RADIUS,
        maxValue,
        maxHeight: attrSettings.bar?.maxHeight || chartHeight,
    };
};

/**
 * Функция, которая считает padding (в px) столбца bar-графика с одной стороны (правой или левой - без разницы)
 * @param x - позиция, до которой производится расчет
 * @param index - кол-во столбцов, которые находятся до позиции x
 * @param barWidth - шиина столбца bar-графика
 */
export const getBarPadding: T.TGetBarPadding = (x, index, barWidth) => {
    // сумма ширин всех столбцов
    const totalBarWidth = index * barWidth;
    /**
     *  Общее количество эллементов отступов. Рассчитывает как:
     *  кол-во столбцов * 2 (кол-во отступов - левый и правый)
     *  + 1 (левый отступ колонки, для которой рассчитывается текущей отступ)
     */
    const totalPaddingElements = index * 2 + 1;
    return (x - totalBarWidth) / totalPaddingElements;
};

export const getBarYCenter: T.TGetBarYCenter = (value, maxValue, chartHeight, maxBarHeight) => {
    const barHeight = (value / maxValue) * maxBarHeight;
    const halfBarHeight = barHeight / 2;
    return chartHeight - halfBarHeight;
};
