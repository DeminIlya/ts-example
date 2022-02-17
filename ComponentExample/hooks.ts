import { useMemo } from 'react';

import { getWeekDay } from 'utils/getWeekDay';

import { TDateRangeSelectedValue } from 'components/interaction/DateRangeSelect/types';

import * as C from './const';
import * as T from './types';

export const useChartType: T.TUseChartType = (dataLength) => {
    return useMemo(() => {
        return dataLength >= C.BAR_CONTENT_MIN_ITEMS_COUNT ? 'bar' : 'line';
    }, [dataLength]);
};

export const useTickFormater: T.TUseTickFormater = (period) => {
    return useMemo(() => {
        switch (period) {
            case 'ALL_TIME_RANGE':
                return (value: string) => new Date(value).getDate().toString();
            case 'LAST_THIRTY_DAY_RANGE':
                return (value: string) => new Date(value).getDate().toString();
            case 'LAST_WEEK_RANGE':
                return (value: string) => getWeekDay(value, true);
            default:
                return undefined;
        }
    }, [period]);
};

export const useTicksInterval: T.TUseTicksInterval = (period) => {
    return useMemo(() => {
        switch (period) {
            case 'ALL_TIME_RANGE':
                return C.ALL_TIME_TICKS_INTERVAL;
            case 'LAST_THIRTY_DAY_RANGE':
                return C.LAST_THIRTY_TICKS_INTERVAL;
            case 'LAST_WEEK_RANGE':
                return C.LAST_WEEK_TICKS_INTERVAL;
            default:
                return undefined;
        }
    }, [period]);
};

export const useHTEChartData = <GenericData extends T.GenericDataBase>(
    data: T.THTEChartData<GenericData>,
    period: TDateRangeSelectedValue,
) => {
    return useMemo(() => {
        switch (period) {
            case 'ALL_TIME_RANGE':
                return data;
            case 'LAST_THIRTY_DAY_RANGE':
                return data.filter((_, index) => index < 30);
            case 'LAST_WEEK_RANGE':
                return data.filter((_, index) => index < 7);
        }
    }, [period]);
};
