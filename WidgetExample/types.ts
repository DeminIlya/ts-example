import { History } from 'history';

import { TAlbum } from 'stores/AlbumsStore/types';
import { TArtist } from 'stores/ArtistsStore/types';
import { TSetSorting } from 'components/table/Th/types';
import { TSetPageHandler } from 'components/interaction/Pagination/types';
import { TBaseExpandedId, TSetExpandedId } from 'components/table/TableExpand/types';
import { Undefinable, TableSettings, TableData } from 'types/common';
import { TDateRangeSelectedValue } from 'components/interaction/DateRangeSelect/types';

export interface ITracksStatisticWidget {
    filterDateRange: TDateRangeSelectedValue;
}

export type TSelect = Undefinable<string>;

export type TTracksStatisticTableAccessor =
    | 'artist'
    | 'income'
    | 'price'
    | 'purchases'
    | 'sung'
    | 'releaseDate';

export type ITracksStatisticTableSettings = TableSettings<TTracksStatisticTableAccessor>;

export type TTracksStatisticTableDataItem = {
    id: string;
    album: string;
    artist: string;
    track: string;
    income: number;
    price: number;
    purchases: number;
    sung: number;
    releaseDate: number | undefined;
};

export type TTableData = TableData<TTracksStatisticTableDataItem>;

export interface ITracksStatisticView {
    albums: Array<TAlbum>;
    artists: Array<TArtist>;
    accessor: TTracksStatisticTableAccessor;
    tablePage: number;
    tableData: Undefinable<Array<TTracksStatisticTableDataItem>>;
    expandedId: TBaseExpandedId;
    setSorting: TSetSorting<TTracksStatisticTableAccessor>;
    setTablePage: TSetPageHandler;
    tablePagesCount: number;
    isDescendingSort: boolean;
    filterDateRange: TDateRangeSelectedValue;
    switchExpandedId: TSetExpandedId<TBaseExpandedId>;
    history: History;
    // redirectToEditTrackPage: (trackName: string) => void;
    // setDeleteTrackModalVisible: (bool: boolean, track?: string) => void;
}
