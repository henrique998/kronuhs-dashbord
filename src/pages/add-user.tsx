import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { DefaultLayout } from '../layouts/DefaultLayout'

import { api } from '../services/api'

import { withSSRAuth } from '../utils/withSSRAuth'

import { AddUserContainer, FormContainer, InputErrorMessage, InputGroup, Select } from '../styles/pages/addUser'
import { WarningCircle } from 'phosphor-react'
import { DropImage } from '../components/DropImage'
import { FileSelected } from '../components/FileSelected'
import { useState } from 'react'

interface Role {
  id: string
  name: string
}

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: File | string;
  roleId: string;
}

const addUserValidationSchema = zod.object({
  firstName: zod.string().min(1, 'Campo é obrigatório'),
  lastName: zod.string().min(1, 'Campo é obrigatório'),
  email: zod.string().min(1, 'Campo é obrigatório'),
  roleId: zod.string().min(1, 'Campo é obrigatório'),
})

export default function AddUser() {
  const [image, setImage] = useState<any>('')
  const [isImageErr, setIsImageErr] = useState(false)

  const router = useRouter()

  const { data: allRoles } = useQuery(['allRoles'], async () => {
    return await api.get<Role[]>('/dashboard/roles')
  })

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  const createUser = useMutation(async ({ firstName, lastName, email, roleId }: UserData) => {
    await api.post('/dashboard/users', {
      firstName,
      lastName,
      email,
      roleId
    }, config)
  })

  const { isLoading } = createUser

  async function handleCreateNewUser({ firstName, lastName, email, roleId }: UserData) {
    if (!image) {
      setIsImageErr(true)
    }

    const formData = new FormData();

    formData.append('avatar', image);

    await createUser.mutateAsync({
      firstName,
      lastName,
      email,
      avatar: formData.get('avatar'),
      roleId
    })

    router.push('/home')
  }

  function handleChangeImage(image: File) {
    setImage(image)
    setIsImageErr(false)
  }

  function handleDeleteImageSelected() {
    setImage(null)
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(addUserValidationSchema),
  })

  const firstNameError = errors.firstName?.message
  const lastNameError = errors.lastName?.message
  const emailError = errors.email?.message
  const roleError = errors.roleId?.message

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
              {...register('firstName')}
              isError={!!firstNameError}
            />

            {firstNameError && (
              <InputErrorMessage>
                <WarningCircle size={16} />
                
                {String(firstNameError)}
              </InputErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label htmlFor="lastName">Último Nome</label>

            <Input 
              type="text" 
              placeholder="doe.."
              {...register('lastName')}
              isError={!!lastNameError}
            />

            {lastNameError && (
              <InputErrorMessage>
                <WarningCircle size={16} />
                
                {String(lastNameError)}
              </InputErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label htmlFor="email">E-mail</label>

            <Input 
              type="email" 
              placeholder="jhondoe@gmail.com"
              {...register('email')}
              isError={!!emailError}
            />

            {emailError && (
              <InputErrorMessage>
                <WarningCircle size={16} />
                
                {String(emailError)}
              </InputErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label>
              Imagem<span>*</span>
            </label>

            <DropImage 
              onChangeImage={handleChangeImage} 
              isError={isImageErr} 
            />

            {image && (
              <FileSelected
                name={image.name}
                onDelete={handleDeleteImageSelected}
              />
            )}

            {isImageErr && (
              <InputErrorMessage>
                <WarningCircle size={16} />
                
                Campo obrigatório
              </InputErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label htmlFor="role">Cargo</label>

            <Select id="role" {...register('roleId')} isError={!!roleError}>
              {allRoles?.data.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Select>

            {roleError && (
              <InputErrorMessage>
                <WarningCircle size={16} />
                
                {String(roleError)}
              </InputErrorMessage>
            )}
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