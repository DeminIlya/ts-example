import { getTableFixedColumnSettings, getTableSliceColumnSettings } from 'utils/table';

import * as T from '../types';
import * as C from '../const';

export const FIXED_COLUMNS_ACCESSORS: Array<T.TTracksStatisticTableAccessor> = ['artist'];
export const SLICE_COLUMNS_ACCESSORS: Array<T.TTracksStatisticTableAccessor> = [
    'income',
    'price',
    'purchases',
    'releaseDate',
    'sung',
];

export const FIXED_COLUMNS_SETTINGS = getTableFixedColumnSettings<T.TTracksStatisticTableAccessor>(
    C.COLUMNS_SETTINGS,
    FIXED_COLUMNS_ACCESSORS,
);
export const SLICE_COLUMNS_SETTINGS = getTableSliceColumnSettings<T.TTracksStatisticTableAccessor>(
    C.COLUMNS_SETTINGS,
    SLICE_COLUMNS_ACCESSORS,
);
