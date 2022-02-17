import React, { useMemo, memo } from 'react';
import {
    LineChart,
    Line,
    ResponsiveContainer,
    YAxis,
    Tooltip as RechartsTooltip,
    XAxis,
} from 'recharts';
import { DataKey } from 'recharts/types/util/types';

import { useRootStore } from 'stores/initStore';
import { getObjectsArrayMaxValue } from 'utils/getObjectsArrayMaxValue';

import { LineChartActiveLine } from 'components/charts/LineChartActiveDot';
import { TooltipWrapper, getTooltipRightOffset } from 'components/charts/Tooltip';

import * as C from '../../const';
import { HTEChartContentWrapper } from '../../units';
import { GenericDataBase, IHTEChart } from '../../types';

import * as U from './utils';

const HTEChartLineContentMemo: <GenericData extends GenericDataBase>(
    c: (props: IHTEChart<GenericData>) => JSX.Element,
) => any = memo;

export const HTEChartLineContent = HTEChartLineContentMemo(
    <GenericData extends GenericDataBase>({
        height = C.CHART_HEIGHT,
        ...props
    }: IHTEChart<GenericData>) => {
        const { windowSizeStore } = useRootStore();

        const maxAttrsValues = props.attrs.map((attr) => {
            return getObjectsArrayMaxValue(props.data, attr.dataKey);
        });

        const attrsDotSettings = props.attrs.map((attr) => {
            return U.getDotSettings(attr.color.common);
        });

        const trigger =
            windowSizeStore.device === 'desktop' || windowSizeStore.device === 'laptop'
                ? 'hover'
                : 'click';

        const lastIndex = useMemo(() => {
            return props.attrs.length - 1;
        }, [props.attrs.length]);

        return (
            <HTEChartContentWrapper>
                <ResponsiveContainer width="100%" height={height + C.AXIS_HEIGHT}>
                    <LineChart
                        key={`line-chart-${props.data.length}`}
                        data={props.data}
                        margin={C.CHART_MARGIN}
                    >
                        {props.attrs.map((attr, index) => {
                            const key = U.getLineKey(String(attr.dataKey));
                            const axisKey = U.getAxisKey(String(attr.dataKey));

                            const activeDot =
                                index === lastIndex
                                    ? (dotProps: any) => {
                                          const dotsY = props.attrs.map((attr, index) => {
                                              return U.getDotYPosition(
                                                  maxAttrsValues[index],
                                                  C.MIN_ATTRS_VALUE,
                                                  dotProps.payload[attr.dataKey],
                                                  height,
                                              );
                                          });

                                          return (
                                              <LineChartActiveLine
                                                  x={dotProps.cx}
                                                  y1={height - Math.max(...dotsY)}
                                                  y2={height}
                                                  color={C.DEFAULT_LINE_STROKE}
                                              />
                                          );
                                      }
                                    : false;

                            return (
                                <Line
                                    key={key}
                                    dot={attrsDotSettings[index]}
                                    type="monotone"
                                    stroke={attr.color.common}
                                    yAxisId={axisKey}
                                    dataKey={attr.dataKey as DataKey<any>}
                                    strokeWidth={C.DEFAULT_LINE_WIDTH}
                                    activeDot={activeDot}
                                />
                            );
                        })}

                        {props.attrs.map((attr) => {
                            const key = U.getAxisKey(String(attr.dataKey));

                            return (
                                <YAxis
                                    hide
                                    key={key}
                                    domain={[C.MIN_ATTRS_VALUE, 'dataMax']}
                                    yAxisId={key}
                                />
                            );
                        })}

                        {props.tooltipContent && (
                            <RechartsTooltip
                                cursor={false}
                                trigger={trigger}
                                content={(rechartsTooltipProps) => {
                                    if (!rechartsTooltipProps.active) {
                                        return null;
                                    }
                                    const tooltipRightOffset =
                                        getTooltipRightOffset(rechartsTooltipProps);

                                    const mainLineDotYPosition = U.getDotYPosition(
                                        maxAttrsValues[lastIndex],
                                        C.MIN_ATTRS_VALUE,
                                        rechartsTooltipProps?.payload?.[0].payload[
                                            props.attrs[lastIndex].dataKey
                                        ],
                                        height,
                                    );

                                    const data = rechartsTooltipProps?.payload?.[0]?.payload;

                                    return (
                                        <TooltipWrapper
                                            y={height - mainLineDotYPosition}
                                            minHeight={height}
                                            rightOffset={tooltipRightOffset}
                                        >
                                            {props.tooltipContent && (
                                                <props.tooltipContent
                                                    {...data}
                                                    chartType={'line'}
                                                />
                                            )}
                                        </TooltipWrapper>
                                    );
                                }}
                            />
                        )}

                        <XAxis height={C.AXIS_HEIGHT} tickFormatter={() => ''} />
                    </LineChart>
                </ResponsiveContainer>
            </HTEChartContentWrapper>
        );
    },
);
