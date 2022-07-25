import { FormEvent, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Button } from '../components/Button'
import { DropImage } from '../components/DropImage'
import { FileSelected } from '../components/FileSelected'
import { Input } from '../components/Input'
import { DefaultLayout } from '../layouts/DefaultLayout'

import { api } from '../services/api'

import { AddUserContainer, FormContainer, InputGroup } from '../styles/pages/addUser'
import { withSSRAuth } from '../utils/withSSRAuth'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

interface Role {
  id: string
  name: string
}

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
}

export default function AddUser() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [roleId, setRoleId] = useState('')

  const router = useRouter()

  const { data: allRoles } = useQuery(['allRoles'], async () => {
    return await api.get<Role[]>('/dashboard/roles')
  })

  const createUser = useMutation(async ({ firstName, lastName, email, roleId }: UserData) => {
    await api.post('/dashboard/users', {
      firstName,
      lastName,
      email,
      roleId
    })
  })

  const { isLoading } = createUser

  // function handleChangeImage(photo: File) {
  //   setPhoto(photo)
  // }

  // function handleDeleteImageSelected() {
  //   setPhoto(null)
  // }

  async function handleCreateNewUser(e: FormEvent) {
    e.preventDefault()

    await createUser.mutateAsync({
      firstName,
      lastName,
      email,
      roleId
    })

    setFirstName('')
    setLastName('')
    setEmail('')
    setRoleId('')

    router.push('/home')
  }

  return (
    <DefaultLayout>
      <AddUserContainer>
        <h1>
          Adicionar <span>usuário</span>
        </h1>

        <FormContainer onSubmit={handleCreateNewUser}>
          <InputGroup>
            <label htmlFor="firstName">Primeiro Nome</label>

            <Input 
              type="text" 
              placeholder="Jhon.." 
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="lastName">Último Nome</label>

            <Input 
              type="text" 
              placeholder="doe.." 
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="email">E-mail</label>

            <Input 
              type="email" 
              placeholder="jhondoe@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="role">Cargo</label>

            <select value={roleId} onChange={e => setRoleId(e.target.value)}>
              {allRoles?.data.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </InputGroup>

          <Button 
            type="submit" 
            title="Registrar usuário" 
            isLoading={isLoading}
          />
        </FormContainer>
      </AddUserContainer>
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