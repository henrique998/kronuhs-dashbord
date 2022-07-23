import { HeaderWrapper, Container } from './styles'

import { useAuth } from '../../hooks'

export function Header() {
  const { user } = useAuth()

  return (
    <HeaderWrapper>
      <Container>
        <h3>
          E aí {user?.firstName}, <span>Vamos escrever?</span>
        </h3>

        {/* <img src={user?.avatarUrl} alt={`foto de ${user?.firstName}`} /> */}
      </Container>
    </HeaderWrapper>
  )
}
