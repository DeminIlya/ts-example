import styled from '@emotion/styled';

import * as media from 'styles/mediaQueries';
import { SliceContainer } from 'components/other';

import * as C from './const';

export const HTEChartWrapper = styled.div``;

export const SliceContainerStyled = styled(SliceContainer)`
    overflow: visible;
`;

export const HTEChartContentWrapper = styled.div`
    width: 100%;

    ${media.tablet} {
        /* padding-right: ${({ theme }) => theme.tablet.pagePadding}; */
        /* overflow: auto; */

        /* https://blog.hubspot.com/website/hide-scrollbar-css */
        /* scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            display: none;
        } */
    }

    & .recharts-surface {
        overflow: visible;
    }

    & .recharts-tooltip-wrapper {
        z-index: ${({ theme }) => theme.zIndex.tooltip};
    }

    & .recharts-responsive-container {
        height: ${C.CHART_HEIGHT + 1}px !important;

        ${media.mobile} {
            height: ${C.CHART_HEIGHT + 2}px !important;
        }
    }

    & .recharts-wrapper {
        ${media.tablet} {
            box-sizing: content-box;
        }
    }

    & .recharts-xAxis {
        /* transform: translateY(30px); // 30px - высота блока xAxis, задана в библиотеке rechart */

        & .recharts-cartesian-axis-line {
            stroke: ${C.DEFAULT_LINE_STROKE};

            ${media.mobile} {
                stroke-width: 2px;
            }
        }
        & .recharts-cartesian-axis-tick-line {
            display: none;
        }
        & .recharts-cartesian-axis-tick-value tspan {
            display: none;

            fill: ${({ theme }) => theme.colors.text.secondary};
            font-size: 12px;
            line-height: 16px;

            ${media.mobile} {
                display: block;
            }
        }
    }
`;
