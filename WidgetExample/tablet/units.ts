import styled from '@emotion/styled';

import { Pagination } from 'components/interaction';

export const HTEChartContainer = styled.div`
    padding-top: 40px;
`;

export const PaginationStyled = styled(Pagination)`
    padding: ${({ theme }) => `0px ${theme.tablet.pagePadding}`};
`;
