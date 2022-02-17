import * as T from './types';
import * as C from 'components/charts/HTEChart/const';

import { LINE_KEY_POSTFIX, AXIS_KEY_POSTFIX } from './const';

export const getDotYPosition: T.TGetDotYPosition = (maxValue, minValue, value, height) => {
    const percentFill = (value - minValue) / (maxValue - minValue);

    return height * percentFill;
};

export const getDotSettings = (color: string) => {
    return {
        ...C.LINE_CHART_DOT_SETTINGS,
        fill: color,
    };
};

export const getLineKey = (prefix: string) => {
    return `${prefix}-${LINE_KEY_POSTFIX}`;
};

export const getAxisKey = (prefix: string) => {
    return `${prefix}-${AXIS_KEY_POSTFIX}`;
};
