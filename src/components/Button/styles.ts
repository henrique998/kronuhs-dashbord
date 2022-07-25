import styled from 'styled-components'

interface ButtonProps {
  isDraft?: boolean
}

export const Button = styled.button<ButtonProps>`
  height: 2.5rem;
  border-radius: 8px;
  background-color: ${(props) => props.isDraft ? props.theme.yellow : props.theme['green-500']};
  color: ${(props) => props.theme.white};
  padding: 0 1rem;

  font-weight: 500;
  font-size: 0.875rem;

  transition: filter 0.1s;

  &:not(:disabled):hover {
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
