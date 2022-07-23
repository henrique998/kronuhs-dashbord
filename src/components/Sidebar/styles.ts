import styled from 'styled-components'

export const SidebarWrapper = styled.aside`
  width: 16rem;
  height: 100vh;
  background-color: ${(props) => props.theme.white};
  border-right: 1px solid ${(props) => props.theme['gray-300']};
  padding: 1rem;
`

export const SidebarContainer = styled.div`
  height: 100%;

  max-width: 201px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > img {
    display: block;

    width: 138px;
    margin: 0 auto;
  }
`

export const MenuContainer = styled.div`
  display: grid;
  gap: 1.25rem;
`

interface LinkContainerProps {
  isActive: boolean
}

export const LinkContainer = styled.div<LinkContainerProps>`
  padding: 1rem;

  background: ${(props) => props.isActive && 'rgba(158, 255, 202, 0.24)'};
  border-radius: 8px;

  .contentLink {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    color: ${(props) =>
      props.isActive ? props.theme['green-500'] : props.theme['gray-400']};

    &:hover {
      color: ${(props) => !props.isActive && props.theme['green-500']};
    }
  }
`

export const LoggoutButton = styled.button`
  display: flex;
  gap: 8px;

  color: ${(props) => props.theme['gray-400']};

  &:hover {
    color: ${(props) => props.theme['green-500']};
  }
`
