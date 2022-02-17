import { useMemo } from 'react';

import * as C from 'components/charts/HTEChart/const';

export const useDotSettings = (color: string) => {
    return useMemo(() => {
        return {
            ...C.LINE_CHART_DOT_SETTINGS,
            fill: color,
        };
    }, [color]);
};
