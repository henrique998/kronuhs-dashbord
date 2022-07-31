import styled from "styled-components";

export const PaginationContainer = styled.div`
    width: fit-content;

    margin: 58px auto;

    display: flex;
    align-items: center;
    gap: 1.25rem;
`

interface PaginationItemProps {
    isActive?: boolean;
}

export const PaginationItem = styled.button<PaginationItemProps>`
    width: fit-content;
    padding: 0.5rem 1rem;
    background-color: ${props => props.isActive ? props.theme["green-500"] : props.theme.white};
    border: 1px solid ${props => !props.isActive && props.theme["gray-400"]};
    border-radius: 0.5rem;
    cursor: pointer;
    color: ${props => props.isActive ? props.theme.white : props.theme["gray-400"]};
`