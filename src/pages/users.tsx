import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Trash, UserPlus } from 'phosphor-react'
import { useState } from 'react'
import { DeleteUserModal } from '../components/DeleteUserModal'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { api } from '../services/api'

import { Heading, TableContainer, UsersContainer } from '../styles/pages/users'
import { withSSRAuth } from '../utils/withSSRAuth'

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

export default function Users() {
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false)
  
  const { data: allUsers } = useQuery(['allUsers'], async () => {
    return await api.get<User[]>('/dashboard/users')
  })

  const deleteUser = useMutation(async (userId: string) => {
    await api.delete(`/dashboard/users/delete/${userId}`)
  })

  const usersCount = allUsers?.data.length >= 1 ? allUsers?.data.length : 0;

  function handleOpenModal() {
    setIsDeleteUserModalOpen(true)
  }

  function handleCloseModal() {
    setIsDeleteUserModalOpen(false)
  }

  async function handleDeleteUser(userId: string) {
    await deleteUser.mutateAsync(userId)

    setIsDeleteUserModalOpen(false)    
  }

  return (
    <DefaultLayout>
      <UsersContainer>
        <h1>
          <span>Usuários</span> do painel
        </h1>

        <Heading>
          <h3>
            Todos os usuários <strong>({usersCount})</strong>
          </h3>

          <Link href="/add-user">
            <a className="addUserButton">
                <UserPlus size={20} />
                Adicionar usuário
            </a>
          </Link>
        </Heading>

        <TableContainer>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Criado em</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allUsers?.data.map(user => (
              <>
                <tr key={user.id}>
                  <td>
                    <img src="/leo.png" alt="léo" />
                  </td>

                  <td>{user.firstName} {user.lastName}</td>

                  <td>{user.email}</td>

                  <td>{String(user.createdAt)}</td>

                  <td>
                    <button 
                      type="button" 
                      className="buttonTrash"
                      onClick={() => handleOpenModal()}
                    >
                      <Trash size={24} />
                    </button>
                  </td>
                </tr>

                <DeleteUserModal 
                  isOpen={isDeleteUserModalOpen}
                  onClose={handleCloseModal}
                  onDelete={() => handleDeleteUser(user.id)}
                />
              </>
            ))}
          </tbody>
        </TableContainer>
      </UsersContainer>
    </DefaultLayout>
  )
}


export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
}, {
  roles: [
    {
      name: 'admin'
    }
  ]
})