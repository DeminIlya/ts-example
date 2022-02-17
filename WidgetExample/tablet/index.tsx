import React, { useState, useRef, FC } from 'react';
import { generatePath } from 'react-router';

import { formatDate } from 'utils/formatDate';
import { DEFAULT_FIXED_COLUMN_WIDTH, DEFAULT_SLICE_COLUMN_WIDTH } from 'const';

import {
    TrackHTEChart,
    DragArea,
    useDragAreaBoundsByRef,
    SliceContainer,
    IntFormater,
    AvatarBlock,
    SyntheticCell,
    SyntheticThead,
    SyntheticTbody,
    SyntheticTableExpand,
    SyntheticThWithSorting,
    SyntheticTableWithAvatarBlock,
    RouterLink,
    DataShortageInformer,
} from 'components';

import { TRACK_CATALOG_PAGE_PATH } from 'router/const';

import * as T from '../types';
import * as S from '../units';
import * as TEXT from '../text/ru';

import * as TABLET_C from './const';
import * as TABLET_S from './units';

export const TabletTracksStatistic: FC<T.ITracksStatisticView> = (props) => {
    const sliceContainerRef = useRef<HTMLDivElement>(null);

    const dragAreaBounds = useDragAreaBoundsByRef<HTMLDivElement>(sliceContainerRef);

    const [scrollLeft, setScrollLeft] = useState(0);

    return (
        <>
            <DragArea x={scrollLeft} setX={setScrollLeft} bounds={dragAreaBounds}>
                <SyntheticTableWithAvatarBlock>
                    <SyntheticThead isSticky withSliceContainer>
                        {TABLET_C.FIXED_COLUMNS_SETTINGS.map((settings) => (
                            <SyntheticThWithSorting
                                key={`table-head-${settings.accessor}`}
                                width={settings.width}
                                accessor={settings.accessor}
                                setSorting={props.setSorting}
                                activeAccessor={props.accessor}
                                isDescendingSort={props.isDescendingSort}
                            >
                                {settings.header}
                            </SyntheticThWithSorting>
                        ))}

                        <SliceContainer scrollLeft={scrollLeft} ref={sliceContainerRef}>
                            {TABLET_C.SLICE_COLUMNS_SETTINGS.map((settings) => (
                                <SyntheticThWithSorting
                                    key={`table-head-${settings.accessor}`}
                                    width={settings.width}
                                    accessor={settings.accessor}
                                    setSorting={props.setSorting}
                                    activeAccessor={props.accessor}
                                    isDescendingSort={props.isDescendingSort}
                                >
                                    {settings.header}
                                </SyntheticThWithSorting>
                            ))}
                        </SliceContainer>
                    </SyntheticThead>

                    <SyntheticTbody>
                        {props.tableData?.map((row) => {
                            return (
                                <SyntheticTableExpand
                                    key={`expended-row-${row.id}`}
                                    onSwitch={() => props.switchExpandedId(row.id)}
                                    isExpand={row.id === props.expandedId}
                                    upperRow={
                                        <>
                                            <SyntheticCell width={DEFAULT_FIXED_COLUMN_WIDTH}>
                                                <RouterLink
                                                    to={generatePath(TRACK_CATALOG_PAGE_PATH, {
                                                        trackId: row.id,
                                                    })}
                                                    withUnderline
                                                >
                                                    <AvatarBlock
                                                        src={props.albums
                                                            .find(({ id }) => id === row.album)
                                                            ?.avatar.replace('{w}', '600')
                                                            .replace('{h}', '600')}
                                                        bottomLabel={
                                                            props.artists.find(
                                                                ({ id }) => id === row.artist,
                                                            )?.name
                                                        }
                                                        type="song"
                                                    >
                                                        {row.track}
                                                    </AvatarBlock>
                                                </RouterLink>
                                            </SyntheticCell>

                                            <SliceContainer scrollLeft={scrollLeft}>
                                                <SyntheticCell width={DEFAULT_SLICE_COLUMN_WIDTH}>
                                                    <IntFormater number={row.income} />
                                                </SyntheticCell>

                                                <SyntheticCell width={DEFAULT_SLICE_COLUMN_WIDTH}>
                                                    <IntFormater number={row.price} />
                                                </SyntheticCell>

                                                <SyntheticCell width={DEFAULT_SLICE_COLUMN_WIDTH}>
                                                    <IntFormater number={row.purchases} />
                                                </SyntheticCell>

                                                <SyntheticCell width={DEFAULT_SLICE_COLUMN_WIDTH}>
                                                    <IntFormater number={row.sung} />
                                                </SyntheticCell>

                                                <SyntheticCell width={DEFAULT_SLICE_COLUMN_WIDTH}>
                                                    {row.releaseDate
                                                        ? formatDate(
                                                              new Date(row.releaseDate * 1000),
                                                          )
                                                        : '-'}
                                                </SyntheticCell>
                                            </SliceContainer>
                                        </>
                                    }
                                    content={
                                        row.income > 0 ? (
                                            <TABLET_S.HTEChartContainer>
                                                <TrackHTEChart period={props.filterDateRange} />
                                            </TABLET_S.HTEChartContainer>
                                        ) : (
                                            <S.DataShortageInformerWrapper>
                                                <DataShortageInformer
                                                    title={TEXT.DATA_SHORTAGE_WARNING_TEXT}
                                                />
                                            </S.DataShortageInformerWrapper>
                                        )
                                    }
                                />
                            );
                        })}
                    </SyntheticTbody>
                </SyntheticTableWithAvatarBlock>
            </DragArea>

            <TABLET_S.PaginationStyled
                page={props.tablePage}
                setPage={props.setTablePage}
                count={props.tablePagesCount}
            />
        </>
    );
};
