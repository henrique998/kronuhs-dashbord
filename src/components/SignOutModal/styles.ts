import styled from 'styled-components'

export const SignOutModalContainer = styled.div`
  h1 {
    text-align: center;
    color: ${(props) => props.theme.black};
    font-size: 2rem;
    font-weight: 500;
  }

  p {
    text-align: center;
    color: ${(props) => props.theme['gray-500']};

    span {
      color: ${(props) => props.theme['green-500']};
    }
  }
`

export const ButtonsWrapper = styled.div`
  margin-top: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.125rem;
`

interface ButtonContainerProps {
  variant: 'red' | 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  background-color: ${(props) =>
    props.variant === 'red' ? props.theme.red : props.theme['green-500']};
  color: ${(props) => props.theme.white};
  border-radius: 8px;
  padding: 1rem;

  transition: 0.1s;

  &:hover {
    filter: brightness(0.9);
  }
`
