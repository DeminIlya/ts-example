import React, { FC } from 'react';
import { generatePath } from 'react-router';

import { formatDate } from 'utils/formatDate';

import {
    Row,
    Cell,
    Thead,
    Tbody,
    TableExpand,
    ThWithSorting,
    TableWithAvatarBlock,
    AvatarBlock,
    IntFormater,
    TrackHTEChart,
    RouterLink,
    DataShortageInformer,
} from 'components';

import { TRACK_CATALOG_PAGE_PATH, ARTIST_CATALOG_PAGE_PATH } from 'router/const';

import * as C from '../const';
import * as T from '../types';
import * as S from '../units';
import * as TEXT from '../text/ru';

import * as DESKTOP_S from './units';

export const DesktopTracksStatistic: FC<T.ITracksStatisticView> = (props) => {
    return (
        <>
            <TableWithAvatarBlock>
                <Thead isSticky>
                    <Row>
                        {C.COLUMNS_SETTINGS.map((settings) => (
                            <ThWithSorting<T.TTracksStatisticTableAccessor>
                                key={`table-head-${settings.accessor}`}
                                accessor={settings.accessor}
                                setSorting={props.setSorting}
                                activeAccessor={props.accessor}
                                isDescendingSort={props.isDescendingSort}
                            >
                                {settings.header}
                            </ThWithSorting>
                        ))}
                    </Row>
                </Thead>

                <Tbody>
                    {props.tableData?.map((row) => {
                        return (
                            <TableExpand
                                key={`expended-row-${row.id}`}
                                colSpan={C.COLUMNS_SETTINGS.length}
                                onSwitch={() => props.switchExpandedId(row.id)}
                                isExpand={row.id === props.expandedId}
                                upperRow={
                                    <>
                                        <Cell>
                                            <AvatarBlock
                                                src={props.albums
                                                    .find(({ id }) => id === row.album)
                                                    ?.avatar.replace('{w}', '600')
                                                    .replace('{h}', '600')}
                                                onImageClick={() => {
                                                    props.history.push(
                                                        generatePath(TRACK_CATALOG_PAGE_PATH, {
                                                            trackId: row.id,
                                                        }),
                                                    );
                                                }}
                                                bottomLabel={
                                                    <RouterLink
                                                        to={generatePath(ARTIST_CATALOG_PAGE_PATH, {
                                                            artistId: row.artist,
                                                        })}
                                                        withUnderline
                                                    >
                                                        {
                                                            props.artists.find(
                                                                ({ id }) => id === row.artist,
                                                            )?.name
                                                        }
                                                    </RouterLink>
                                                }
                                                type="song"
                                            >
                                                <RouterLink
                                                    to={generatePath(TRACK_CATALOG_PAGE_PATH, {
                                                        trackId: row.id,
                                                    })}
                                                    withUnderline
                                                >
                                                    {row.track}
                                                </RouterLink>
                                            </AvatarBlock>
                                        </Cell>

                                        <Cell>
                                            <IntFormater number={row.income} />
                                        </Cell>

                                        <Cell>
                                            <IntFormater number={row.price} />
                                        </Cell>

                                        <Cell>
                                            <IntFormater number={row.purchases} />
                                        </Cell>

                                        <Cell>
                                            <IntFormater number={row.sung} />
                                        </Cell>

                                        <Cell>
                                            {row.releaseDate
                                                ? formatDate(new Date(row.releaseDate * 1000))
                                                : '-'}
                                        </Cell>
                                    </>
                                }
                                content={
                                    row.income > 0 ? (
                                        <DESKTOP_S.HTEChartContainer>
                                            <TrackHTEChart period={props.filterDateRange} />
                                        </DESKTOP_S.HTEChartContainer>
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
                </Tbody>
            </TableWithAvatarBlock>

            <DESKTOP_S.PaginationStyled
                page={props.tablePage}
                setPage={props.setTablePage}
                count={props.tablePagesCount}
            />
        </>
    );
};
