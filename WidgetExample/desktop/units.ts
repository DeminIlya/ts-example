import styled from '@emotion/styled';

import { DateRangeSelect, Pagination } from 'components';

export const DateRangeSelectStyled = styled(DateRangeSelect)`
    width: 200px;
`;

export const HTEChartContainer = styled.div`
    padding-top: 32px;
`;

export const PaginationStyled = styled(Pagination)`
    padding: ${({ theme }) => `0px ${theme.laptop.pagePadding}`};
`;

/* Заглушка для отсутствующих данных */
export const NotDataBlock = styled.div`
    width: 100%;

    font-size: 16px;
    line-height: 24px;
    color: #9fa0a6;
    text-align: center;
    padding: 42px 0 84px;
`;
