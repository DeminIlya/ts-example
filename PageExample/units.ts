import styled from '@emotion/styled';

import * as media from 'styles/mediaQueries';
import { JustLine, DateRangeSelect } from 'components';

export const TitleControlWrapper = styled.div`
    display: flex;
    align-items: center;

    margin-top: 24px;

    ${media.tablet} {
        justify-content: space-between;
    }
`;

export const JustLineStyled = styled(JustLine)`
    margin: 0px 50px;

    ${media.tablet} {
        display: none;
    }
`;

export const DateRangeSelectStyled = styled(DateRangeSelect)`
    width: 200px;
`;
