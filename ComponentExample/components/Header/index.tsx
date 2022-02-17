import React from 'react';

import { getObjectsArraySum } from 'utils/getObjectsArraySum';
import { LegendItem } from 'components/charts/LegendItem';
import { DateRangeSelect } from 'components/interaction';

import { GenericDataBase } from '../../types';

import * as S from './units';
import * as T from './types';

/**
 * Заголовок виджета Продаж. Состоит из легенды bar-графика и интерфейса фильтрации
 * @param props {@link IHTEChartHeader}
 */
export const HTEChartHeader = <GenericData extends GenericDataBase>(
    props: T.IHTEChartHeader<GenericData>,
) => {
    return (
        <S.HTEChartHeaderWrapper>
            <S.HTEChartLegend>
                {props.attrs.map((attr) => (
                    <LegendItem
                        key={`${attr.dataKey}-legend-item`}
                        title={attr.title}
                        color={attr.color.common}
                        statistic={getObjectsArraySum<GenericData>(props.data, attr.dataKey)}
                    />
                ))}
            </S.HTEChartLegend>

            <S.HTEChartFilter>
                {props.period && props.setPeriod && (
                    <DateRangeSelect
                        value={props.period}
                        onChange={props.setPeriod}
                        disableBlockWidth
                    />
                )}
            </S.HTEChartFilter>
        </S.HTEChartHeaderWrapper>
    );
};
