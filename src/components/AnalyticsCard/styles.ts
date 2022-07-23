import styled from 'styled-components'

export const AnalyticsCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  margin: 0 auto;

  border: 1px solid ${(props) => props.theme['gray-300']};
  border-radius: 8px;
  padding: 2.5rem;
  color: ${(props) => props.theme['gray-400']};

  font-size: 1.5rem;

  svg {
    color: ${(props) => props.theme['green-500']};
  }
`
