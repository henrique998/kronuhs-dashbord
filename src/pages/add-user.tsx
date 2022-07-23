import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '../components/Button'
import { DropImage } from '../components/DropImage'
import { FileSelected } from '../components/FileSelected'
import { Input } from '../components/Input'
import { DefaultLayout } from '../layouts/DefaultLayout'

import { api } from '../services/api'

import { AddUserContainer, FormContainer, InputGroup } from '../styles/pages/addUser'
import { withSSRAuth } from '../utils/withSSRAuth'
import { useForm } from 'react-hook-form'

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
  const [photo, setPhoto] = useState<File | null>(null)

  const { register, handleSubmit } = useForm();

  const { data: allRoles } = useQuery(['allRoles'], async () => {
    return await api.get<Role[]>('/dashboard/roles')
  })

  function handleChangeImage(photo: File) {
    setPhoto(photo)
  }

  function handleDeleteImageSelected() {
    setPhoto(null)
  }

  async function handleCreateNewUser(data: UserData) {
    console.log(data);
  }

  return (
    <DefaultLayout>
      <AddUserContainer>
        <h1>
          Adicionar <span>usuário</span>
        </h1>

        <FormContainer onSubmit={handleSubmit(handleCreateNewUser)}>
          <InputGroup>
            <label htmlFor="firstName">Primeiro Nome</label>

            <Input 
              type="text" 
              placeholder="Jhon.." 
              {...register("firstName")}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="lastName">Último Nome</label>

            <Input 
              type="text" 
              placeholder="doe.." 
              {...register("lastName")}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="email">E-mail</label>

            <Input 
              type="email" 
              placeholder="jhondoe@gmail.com"
              {...register("email")}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="photo">Foto</label>

            <DropImage onChangeImage={handleChangeImage} />

            {photo && (
              <FileSelected
                name={photo.name}
                onDelete={handleDeleteImageSelected}
              />
            )}
          </InputGroup>

          <InputGroup>
            <label htmlFor="role">Cargo</label>

            <select {...register("roleId")}>
              {allRoles?.data.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </InputGroup>

          <Button type="submit" title="Registrar usuário" />
        </FormContainer>
      </AddUserContainer>
    </DefaultLayout>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})