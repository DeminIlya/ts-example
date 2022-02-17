import React, { useMemo, useLayoutEffect, FC } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { useRootStore } from 'stores/initStore';
import { useMountEffect, useAccessCheck } from 'hooks';
import { usePagination } from 'components/interaction';
import { DEFAULT_TABLE_ITEMS_PER_PAGE } from 'const';
import { useThRoutingSorting, useTableData, useTableExpandedId } from 'components/table';

import * as T from './types';
import * as A from './access';

import { TabletTracksStatistic } from './tablet';
import { DesktopTracksStatistic } from './desktop';

export * from './access';

export const TracksStatistic: FC<T.ITracksStatisticWidget> = observer((props) => {
    const isAccessGranted = useAccessCheck(A.grantedAccess);

    if (!isAccessGranted) {
        return null;
    }

    const history = useHistory();

    const {
        albumsStore: { albums, getAlbums },
        artistsStore: { artists, getArtists },
        tracksStore: { tracks, getTracks },
        windowSizeStore: { device },
    } = useRootStore();

    const tablePagesCount = Math.ceil(tracks.length / DEFAULT_TABLE_ITEMS_PER_PAGE);

    const [accessor, isDescendingSort, setSorting] =
        useThRoutingSorting<T.TTracksStatisticTableAccessor>('artist');
    const [tablePage, setTablePage] = usePagination(0, tablePagesCount);
    const [expandedId, switchExpandedId] = useTableExpandedId();

    useMountEffect(() => {
        getAlbums();
        getTracks();
        getArtists();
    });

    useLayoutEffect(() => {
        switchExpandedId(undefined);
    }, [tablePage, accessor, isDescendingSort]);

    const tableData = useTableData<T.TTracksStatisticTableDataItem>(tracks, {
        accessor,
        isDescendingSort,
        page: tablePage,
        perPage: DEFAULT_TABLE_ITEMS_PER_PAGE,
    });

    const viewProps = useMemo(
        () => ({
            albums,
            artists,
            accessor,
            tablePage,
            tableData,
            expandedId,
            setSorting,
            setTablePage,
            tablePagesCount,
            isDescendingSort,
            switchExpandedId,
            filterDateRange: props.filterDateRange,
            history,
        }),
        [
            albums,
            artists,
            accessor,
            tablePage,
            tableData,
            expandedId,
            setSorting,
            setTablePage,
            tablePagesCount,
            isDescendingSort,
            switchExpandedId,
            props.filterDateRange,
            history,
        ],
    );

    if (device === 'laptop' || device === 'desktop') {
        return <DesktopTracksStatistic {...viewProps} />;
    } else if (device === 'tablet') {
        return <TabletTracksStatistic {...viewProps} />;
    } else {
        return null;
    }
});
