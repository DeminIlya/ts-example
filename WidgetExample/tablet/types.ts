import { TAlbum } from 'stores/AlbumsStore/types';
import { TArtist } from 'stores/ArtistsStore/types';

import * as T from '../types';

export interface TableExpandUpperRow {
    row: T.TTracksStatisticTableDataItem;
    albums: Array<TAlbum>;
    artists: Array<TArtist>;
    scrollLeft: number;
}
