import Image from 'next/image'
import Link from 'next/link'
import { UserCircle } from 'phosphor-react'

import { useAuth } from '../../hooks'

import { HeaderWrapper, Container } from './styles'

export function Header() {
  const { user } = useAuth()

  return (
    <HeaderWrapper>
      <Container>
        <h3>
          E aí {user?.firstName}, <span>Vamos escrever?</span>
        </h3>

        {user?.avatarUrl ? (
          <Link href="/profile">     
            <a>
              <Image
                width={34}
                height={34}
                objectFit="cover"
                src={user?.avatarUrl} 
                loader={() => user?.avatarUrl}
                alt={`foto de ${user?.firstName}`} 
                className="userAvatar"
              />
            </a>
          </Link>
        ) : (
          <Link href="/profile">     
            <a>
              <UserCircle size={30} />
            </a>
          </Link>
        )}
      </Container>
    </HeaderWrapper>
  )
}
