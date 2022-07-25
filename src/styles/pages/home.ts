import styled from 'styled-components'

export const HomeContainer = styled.main`
  padding: 2rem 2rem 0;
  height: calc(100vh - 4rem);
  overflow-y: auto;
`

export const AnalyticsBox = styled.div`
  display: flex;
  align-items: center;
`

export const PostMessageBox = styled.div`
  width: fit-content;

  margin:  auto;

  display: flex;
  align-items: center;
  flex-direction: column;

  svg {
    color: ${props => props.theme['gray-500']};
  }

  p {
    text-align: center;
    color: ${props => props.theme['gray-500']};
  }

  a {
    font-weight: 700;
    color: ${props => props.theme['green-500']};
  }
`