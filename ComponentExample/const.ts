import { TRadius, TMarginObject } from 'types/common';

export const MIN_ATTRS_VALUE = 0;

export const AXIS_HEIGHT = 30;

export const CHART_HEIGHT = 100;
export const CHART_MIN_WIDTH = 900;
export const MOBILE_CHART_MIN_WIDTH = 600;
export const SUB_BARS_HEIGHT_SCALE = 0.6;
export const DEFAULT_BAR_RADIUS: TRadius = [4, 4, 0, 0];
export const DEFAULT_MOBILE_BAR_RADIUS: TRadius = [2, 2, 0, 0];
export const DEFAULT_LINE_WIDTH = 2;
/* TODO: интегрировать в theming */
export const DEFAULT_LINE_STROKE = '#46a8f8';

export const BAR_CONTENT_MIN_ITEMS_COUNT = 10;

export const LINE_CHART_DOT_RADIUS = 3;
export const LINE_CHART_DOT_SETTINGS = {
    r: LINE_CHART_DOT_RADIUS,
    strokeWidth: 0,
};

export const ALL_TIME_TICKS_INTERVAL = 7;
export const LAST_WEEK_TICKS_INTERVAL = 0;
export const LAST_THIRTY_TICKS_INTERVAL = 1;

export const CHART_MARGIN: TMarginObject = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
};
