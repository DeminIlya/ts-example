import React, { useState, useRef, useMemo } from 'react';

import { DragArea, useDragAreaBoundsByRef } from 'components/interaction';

import * as T from '../types';
import * as H from '../hooks';
import * as S from '../units';
import * as C from '../const';
import { HTEChartHeader, HTEChartBarContent } from '../components';

export const MobileHTEChart = <GenericData extends T.GenericDataBase>(
    props: T.IHTEChart<GenericData>,
) => {
    const [scrollLeft, setScrollLeft] = useState(0);

    const sliceContainerRef = useRef<HTMLDivElement>(null);

    const dragAreaBounds = useDragAreaBoundsByRef<HTMLDivElement>(sliceContainerRef);

    const chartType = H.useChartType(props.data.length);

    const minWidth = useMemo(() => {
        return chartType === 'line' ? '100%' : C.MOBILE_CHART_MIN_WIDTH;
    }, [chartType]);

    return (
        <DragArea x={scrollLeft} setX={setScrollLeft} bounds={dragAreaBounds} withStopPropogation>
            <S.HTEChartWrapper>
                <HTEChartHeader
                    data={props.data}
                    attrs={props.attrs}
                    period={props.period}
                    setPeriod={props.setPeriod}
                />

                <S.SliceContainerStyled scrollLeft={scrollLeft} ref={sliceContainerRef}>
                    <HTEChartBarContent<GenericData> {...props} minWidth={minWidth} />
                </S.SliceContainerStyled>
            </S.HTEChartWrapper>
        </DragArea>
    );
};
