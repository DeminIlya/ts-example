import styled from '@emotion/styled';

import * as media from 'styles/mediaQueries';

export const HTEChartHeaderWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    margin-bottom: 48px;

    ${media.mobile} {
        display: block;
        margin-bottom: 58px;
    }
`;

const HeaderBlock = styled.div`
    display: flex;
`;

export const HTEChartLegend = styled(HeaderBlock)`
    & > *:not(:last-of-type) {
        margin-right: 36px;
    }

    ${media.mobile} {
        display: grid;
        gap: 16px;
        grid-template-columns: 1fr 1fr;

        & > *:not(:last-of-type) {
            margin-right: 0;
        }
    }
`;

export const HTEChartFilter = styled(HeaderBlock)`
    z-index: ${({ theme }) => theme.zIndex.tableHead};

    ${media.mobile} {
        display: none;
    }
`;
