import {
  Compass,
  Note,
  NotePencil,
  Power,
  UserPlus,
  Users,
} from 'phosphor-react'
import { useState } from 'react'
import { useIs } from '../../hooks'
import { CanSeeComponent } from '../CanSeeComponent'
import { SignOutModal } from '../SignOutModal'
import { Link } from './Link'

import {
  LoggoutButton,
  MenuContainer,
  SidebarContainer,
  SidebarWrapper,
} from './styles'

export function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const userCanAccessPage = useIs({
    roles: [
      {
        name: 'admin'
      }
    ]
  })

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <SidebarWrapper>
      <SidebarContainer>
        <img src="/kronuhs-logo.svg" alt="logotipo" />

        <MenuContainer>
          <Link path="/home">
            <Compass size={24} />

            <span>Painel</span>
          </Link>

          <CanSeeComponent roles={[ { name: 'admin' } ]}>
            <Link path="/users">
              <Users size={24} />

              <span>Usuários</span>
            </Link>
          </CanSeeComponent>

          <CanSeeComponent roles={[ { name: 'admin' } ]}>
            <Link path="/add-user">
              <UserPlus size={24} />

              <span>Adicionar usuário</span>
            </Link>
          </CanSeeComponent>

          <Link path="/publications">
            <Note size={24} />

            <span>Publicações</span>
          </Link>

          <Link path="/create-publication">
            <NotePencil size={24} />

            <span>Criar Publicação</span>
          </Link>
        </MenuContainer>

        <SignOutModal isOpen={isModalOpen} onClose={handleCloseModal} />

        <LoggoutButton onClick={handleOpenModal}>
          <Power size={24} />
          Sair
        </LoggoutButton>
      </SidebarContainer>
    </SidebarWrapper>
  )
}
