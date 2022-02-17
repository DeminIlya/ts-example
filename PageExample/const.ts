import { ARTISTS_STATISTIC_PAGE_PATH, TRACKS_STATISTIC_PAGE_PATH } from 'router/const';

import * as T from './types';
import * as TEXT from './text/ru';

export const ROUTES: T.TRoutes = [
    {
        label: TEXT.ARTISTS_LABEL,
        value: ARTISTS_STATISTIC_PAGE_PATH,
    },
    {
        label: TEXT.TRACKS_LABEL,
        value: TRACKS_STATISTIC_PAGE_PATH,
    },
];
