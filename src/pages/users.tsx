import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Trash, UserPlus } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { DeleteUserModal } from '../components/DeleteUserModal'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { api } from '../services/api'

import { withSSRAuth } from '../utils/withSSRAuth'
import { formatDate } from '../utils/formatDate'

import { Heading, TableContainer, UsersContainer } from '../styles/pages/users'
import { Pagination } from '../components/Pagination'

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: {
    name: string;
  }[];
  createdAt: Date;
}

interface IResponse {
  totalCountOfUsers: number;
  usersResponse: User[];
}

export default function Users() {
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: response } = useQuery(['allUsers', currentPage], async () => {
    return await api.get<IResponse>(`/dashboard/users?page=${currentPage}`)
  })  

  const usersCount = response?.data.totalCountOfUsers;

  const deleteUser = useMutation(async (userId: string) => {
    await api.delete(`/dashboard/users/delete/${userId}`)
  })

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
              <th>Cargo</th>
              <th>Criado em</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {response?.data.usersResponse.map((user) => (
              <>
                <tr key={user.id}>
                  <td>
                    <img src="/leo.png" alt="léo" />
                  </td>

                  <td>{user.firstName} {user.lastName}</td>

                  <td>{user.email}</td>

                  <td>{user.roles[0].name}</td>

                  <td>{formatDate(user.createdAt.toString())}</td>

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
        
        <Pagination 
          totalCountOfUsers={usersCount}
          onPageChage={setCurrentPage}
          currentPage={currentPage}
        />
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