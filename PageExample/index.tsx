import React, { useState, useEffect } from 'react';
import { useLocation, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { TDateRangeSelectedValue } from 'components/interaction/DateRangeSelect/types';
import { ARTISTS_STATISTIC_PAGE_PATH, TRACKS_STATISTIC_PAGE_PATH } from 'router/const';

import * as Widgets from 'widgets';
import { Title, Section, PageWrapper, TitleWrapper, SwitchSelect } from 'components';

import * as S from './units';
import * as C from './const';
import * as T from './types';
import * as TEXT from './text/ru';

export const StatisticPage = () => {
    const [activeRoute, setActiveRoute] = useState<T.TAvailablePath>();
    const [filterDateRange, setFilterDateRange] =
        useState<TDateRangeSelectedValue>('LAST_THIRTY_DAY_RANGE');

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const route = C.ROUTES.find(({ value }) => value === location.pathname);
        setActiveRoute(route?.value || undefined);
    }, [location]);

    const switchWidgetHandler = (path: T.TAvailablePath) => {
        if (path) {
            history.push(path);
        }
    };

    return (
        <PageWrapper>
            <Section colorScheme="secondary">
                <TitleWrapper>
                    <Title>{TEXT.TITLE}</Title>

                    <S.TitleControlWrapper>
                        <SwitchSelect<T.TAvailablePath>
                            options={C.ROUTES}
                            active={activeRoute}
                            setActive={(value) => switchWidgetHandler(value)}
                        />

                        <S.JustLineStyled />

                        <S.DateRangeSelectStyled
                            value={filterDateRange}
                            onChange={setFilterDateRange}
                            disableBlockWidth
                        />
                    </S.TitleControlWrapper>
                </TitleWrapper>
            </Section>

            <Section colorScheme="secondary">
                <Switch>
                    <Route path={ARTISTS_STATISTIC_PAGE_PATH}>
                        <Widgets.Statistic.ArtistsStatistic filterDateRange={filterDateRange} />
                    </Route>

                    <Route path={TRACKS_STATISTIC_PAGE_PATH}>
                        <Widgets.Statistic.TracksStatistic filterDateRange={filterDateRange} />
                    </Route>

                    <Redirect to={ARTISTS_STATISTIC_PAGE_PATH} />
                </Switch>
            </Section>
        </PageWrapper>
    );
};
