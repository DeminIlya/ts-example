import React from 'react';

import * as T from './types';
import { useRootStore } from 'stores/initStore';

import { TabletHTEChart } from './tablet';
import { DesktopHTEChart } from './desktop';
import { MobileHTEChart } from './mobile';

export { useHTEChartData } from './hooks';

/**
 * Виджет Продаж. Содержит bar-график, легенду графика и фильтр данных (по периоду)
 * @param props {@link IHTEChart}
 */
export const HTEChart = <GenericData extends T.GenericDataBase>(
    props: T.IHTEChart<GenericData>,
) => {
    const {
        windowSizeStore: { device },
    } = useRootStore();

    if (device === 'laptop' || device === 'desktop') {
        return <DesktopHTEChart<GenericData> {...props} />;
    } else if (device === 'tablet') {
        return <TabletHTEChart<GenericData> {...props} />;
    } else if (device === 'mobile') {
        return <MobileHTEChart<GenericData> {...props} />;
    } else {
        return null;
    }
};
