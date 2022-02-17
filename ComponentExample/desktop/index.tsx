import React from 'react';

import * as T from '../types';
import * as H from '../hooks';
import * as S from '../units';
import { HTEChartHeader, HTEChartBarContent, HTEChartLineContent } from '../components';

/**
 * Виджет Продаж. Содержит bar-график, легенду графика и фильтр данных (по периоду)
 * @param props {@link IHTEChart}
 */
export const DesktopHTEChart = <GenericData extends T.GenericDataBase>({
    ...props
}: T.IHTEChart<GenericData>) => {
    const chartType = H.useChartType(props.data.length);

    return (
        <S.HTEChartWrapper>
            <HTEChartHeader
                data={props.data}
                attrs={props.attrs}
                period={props.period}
                setPeriod={props.setPeriod}
            />

            {chartType === 'bar' && <HTEChartBarContent<GenericData> {...props} />}

            {chartType === 'line' && <HTEChartLineContent<GenericData> {...props} />}
        </S.HTEChartWrapper>
    );
};
