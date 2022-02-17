import * as T from './types';
import * as TEXT from './text/ru';

export const COLUMNS_SETTINGS: T.ITracksStatisticTableSettings = [
    {
        header: TEXT.TABLE_TRACK_ARTIST_HEADER_LABEL,
        accessor: 'artist',
    },
    {
        header: TEXT.TABLE_INCOME_HEADER_LABEL,
        accessor: 'income',
    },
    {
        header: TEXT.TABLE_PRICE_HEADER_LABEL,
        accessor: 'price',
    },
    {
        header: TEXT.TABLE_PURCHASES_HEADER_LABEL,
        accessor: 'purchases',
    },
    {
        header: TEXT.TABLE_SUNG_HEADER_LABEL,
        accessor: 'sung',
    },
    {
        header: TEXT.TABLE_RELEASE_HEADER_LABEL,
        accessor: 'releaseDate',
    },
];
