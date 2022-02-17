import { Undefinable } from 'types/common';
import { ARTISTS_STATISTIC_PAGE_PATH, TRACKS_STATISTIC_PAGE_PATH } from 'router/const';

export type TAvailablePath = Undefinable<
    typeof ARTISTS_STATISTIC_PAGE_PATH | typeof TRACKS_STATISTIC_PAGE_PATH
>;

export type TRoutes = Array<{
    label: string;
    value: TAvailablePath;
}>;
