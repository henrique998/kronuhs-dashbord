import styled from 'styled-components'

interface InputProps {
  isError?: boolean;
}

export const Input = styled.input<InputProps>`
  height: 2.5rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.isError ? props.theme.red : props.theme['gray-400']};
  padding: 0 1rem;
  color: ${(props) => props.theme.black};
  font-size: 0.875rem;

  outline: 0;

  &:focus {
    border: 1px solid ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    font-size: 0.875rem;
    color: ${(props) => props.theme['gray-400']};
  }
`
