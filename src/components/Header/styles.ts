import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.white};
  border-bottom: 1px solid ${(props) => props.theme['gray-400']};
  padding: 1rem 0;
`

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${(props) => props.theme.black};

    span {
      color: ${(props) => props.theme['green-500']};
    }
  }

  a {
    .userAvatar {
      border-radius: 50%;
    }

    svg {
      color: ${(props) => props.theme['gray-400']};
    }
  }
`
