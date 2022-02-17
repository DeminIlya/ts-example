import React, { useState, useRef } from 'react';

import { DragArea, useDragAreaBoundsByRef } from 'components/interaction';

import * as T from '../types';
import * as H from '../hooks';
import * as S from '../units';
import { HTEChartHeader, HTEChartBarContent, HTEChartLineContent } from '../components';

export const TabletHTEChart = <GenericData extends T.GenericDataBase>(
    props: T.IHTEChart<GenericData>,
) => {
    const [scrollLeft, setScrollLeft] = useState(0);

    const sliceContainerRef = useRef<HTMLDivElement>(null);

    const dragAreaBounds = useDragAreaBoundsByRef<HTMLDivElement>(sliceContainerRef);

    const chartType = H.useChartType(props.data.length);

    if (chartType === 'bar') {
        return (
            <DragArea
                x={scrollLeft}
                setX={setScrollLeft}
                bounds={dragAreaBounds}
                withStopPropogation
            >
                <S.HTEChartWrapper>
                    <HTEChartHeader
                        data={props.data}
                        attrs={props.attrs}
                        period={props.period}
                        setPeriod={props.setPeriod}
                    />

                    <S.SliceContainerStyled scrollLeft={scrollLeft} ref={sliceContainerRef}>
                        <HTEChartBarContent<GenericData> {...props} />
                    </S.SliceContainerStyled>
                </S.HTEChartWrapper>
            </DragArea>
        );
    }

    if (chartType === 'line') {
        return (
            <S.HTEChartWrapper>
                <HTEChartHeader
                    data={props.data}
                    attrs={props.attrs}
                    period={props.period}
                    setPeriod={props.setPeriod}
                />

                <HTEChartLineContent<GenericData> {...props} />
            </S.HTEChartWrapper>
        );
    }

    return null;
};
