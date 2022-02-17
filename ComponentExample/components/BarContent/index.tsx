import React, { useMemo, memo } from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis } from 'recharts';
import { DataKey } from 'recharts/types/util/types';

import { useRootStore } from 'stores/initStore';
import { getObjectsArrayMaxValue } from 'utils/getObjectsArrayMaxValue';

import { MultiBar } from 'components/charts/MultiBar';
import {
    TooltipWrapper,
    getTooltipRightOffset,
    getTooltipСarriageHeight,
} from 'components/charts/Tooltip';

import * as C from '../../const';
import { HTEChartContentWrapper } from '../../units';
import { IHTEChart, GenericDataBase } from '../../types';
import { useTicksInterval, useTickFormater } from '../../hooks';

import * as U from './utils';
import * as T from './types';

const HTEChartBarContentMemo: <GenericData extends GenericDataBase>(
    c: (props: IHTEChart<GenericData>) => JSX.Element,
) => any = memo;

export const HTEChartBarContent = HTEChartBarContentMemo(
    <GenericData extends GenericDataBase>({
        height = C.CHART_HEIGHT,
        minWidth = C.CHART_MIN_WIDTH,
        ...props
    }: T.IHTEBarChart<GenericData>) => {
        const { windowSizeStore } = useRootStore();

        const interval = useTicksInterval(props.period);
        const tickFormater = useTickFormater(props.period);

        const maxAttrsValues = props.attrs.map((attr) => {
            return getObjectsArrayMaxValue(props.data, attr.dataKey);
        });

        const trigger = useMemo(() => {
            return windowSizeStore.device === 'desktop' || windowSizeStore.device === 'laptop'
                ? 'hover'
                : 'click';
        }, [windowSizeStore.device]);

        return (
            <HTEChartContentWrapper>
                <ResponsiveContainer
                    width="100%"
                    height={height + C.AXIS_HEIGHT}
                    minWidth={minWidth}
                >
                    <BarChart
                        key={`bar-chart-${props.data.length}`}
                        data={props.data}
                        margin={C.CHART_MARGIN}
                    >
                        <Bar
                            shape={(shapeProps) => {
                                const attrsProps = props.attrs.map((attr, index) => {
                                    return U.getBarPropData(
                                        shapeProps,
                                        maxAttrsValues[index],
                                        height,
                                        attr,
                                    );
                                });

                                const barPadding = U.getBarPadding(
                                    shapeProps.x,
                                    shapeProps.index,
                                    shapeProps.width,
                                );

                                return (
                                    <MultiBar
                                        x={shapeProps.x}
                                        width={shapeProps.width}
                                        barPadding={barPadding}
                                        chartHeight={100}
                                        activeColor={props.attrs[0].color.active}
                                        barsSettings={attrsProps}
                                    />
                                );
                            }}
                            dataKey={props.dataKey as DataKey<any>}
                            isAnimationActive={false}
                        />

                        {props.tooltipContent && (
                            <RechartsTooltip
                                cursor={false}
                                trigger={trigger}
                                content={(rechartsTooltipProps) => {
                                    if (!rechartsTooltipProps.active) {
                                        return null;
                                    }

                                    const data = rechartsTooltipProps?.payload?.[0]
                                        ?.payload as GenericData;
                                    const tooltipRightOffset =
                                        getTooltipRightOffset(rechartsTooltipProps);

                                    const tooltipY = Math.min(
                                        ...props.attrs.map((item, index) => {
                                            const maxBarHeight = item.bar?.maxHeight || height;

                                            const payloadValue =
                                                rechartsTooltipProps.payload?.[0].payload?.[
                                                    item.dataKey
                                                ];

                                            return U.getBarYCenter(
                                                payloadValue,
                                                maxAttrsValues[index],
                                                height,
                                                maxBarHeight,
                                            );
                                        }),
                                    );

                                    const carriageHeight = Math.min(
                                        ...props.attrs.map((item, index) => {
                                            const maxBarHeight = item.bar?.maxHeight || height;

                                            const payloadValue =
                                                rechartsTooltipProps.payload?.[0].payload?.[
                                                    item.dataKey
                                                ];

                                            return getTooltipСarriageHeight(
                                                payloadValue,
                                                maxAttrsValues[index],
                                                height,
                                                maxBarHeight,
                                            );
                                        }),
                                    );

                                    return (
                                        <TooltipWrapper
                                            y={tooltipY}
                                            minHeight={height}
                                            rightOffset={tooltipRightOffset}
                                            carriageHeight={carriageHeight}
                                        >
                                            {props.tooltipContent && (
                                                <props.tooltipContent {...data} chartType={'bar'} />
                                            )}
                                        </TooltipWrapper>
                                    );
                                }}
                            />
                        )}

                        <XAxis
                            height={C.AXIS_HEIGHT}
                            dataKey={props.dataKey as DataKey<any>}
                            interval={interval}
                            tickFormatter={tickFormater}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </HTEChartContentWrapper>
        );
    },
);
