import styled from 'styled-components'

export const FileSelectedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${(props) => props.theme['gray-400']};
  border-radius: 8px;
  padding: 0.5rem 1rem;

  span {
    color: ${(props) => props.theme['gray-700']};
    font-size: 0.875rem;
  }

  button {
    line-height: 0;
  }
`
