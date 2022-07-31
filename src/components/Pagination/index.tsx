import { PaginationContainer, PaginationItem } from "./styles";

interface PaginationProps {
    totalCountOfUsers: number;
    currentPage?: number;
    onPageChage: (page: number) => void;
}

export function Pagination({ totalCountOfUsers, currentPage = 1, onPageChage }: PaginationProps) {
    const totalPages = Math.ceil(totalCountOfUsers / 10);

    const previousPage = currentPage - 1;

    const nextPage = currentPage + 1;

    return (
        <PaginationContainer>
            {currentPage > 1 && (
                <PaginationItem onClick={() => onPageChage(previousPage)}>
                    {previousPage}
                </PaginationItem>
            )}

            <PaginationItem isActive>{currentPage}</PaginationItem>

            {currentPage < totalPages && (
                <PaginationItem onClick={() => onPageChage(nextPage)}>
                    {nextPage}
                </PaginationItem>
            )}
        </PaginationContainer>
    );
}