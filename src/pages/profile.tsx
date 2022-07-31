/* eslint-disable @next/next/no-img-element */
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

import { FileSelected } from "../components/FileSelected";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { DefaultLayout } from "../layouts/DefaultLayout";

import { useAuth } from "../hooks";

import { 
    ProfileContainer, 
    Heading, 
    AvatarFormContainer,
    DataFormContainer,
    InputGroup
} from "../styles/pages/profile";
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";
import Router from "next/router";
import { withSSRAuth } from "../utils/withSSRAuth";

type UserData = {
    firstName?: string;
    lastName?: string;
    email?: string;
}

type Avatar = {
    avatar: File | string;
}

export default function Profile() {
    const [avatarFile, setAvatarFile] = useState<any>('')

    const { user } = useAuth()

    const isUpdateAvatarButtonDisabled = !avatarFile;

    const { register, handleSubmit, reset } = useForm();

    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }

    const updateUserAvatar = useMutation(async ({ avatar }: Avatar) => {
        await api.patch('/dashboard/users/update/avatar', {
            avatar
        }, config)

        setAvatarFile(null)

        Router.push('/home')
    })

    const updateUserData = useMutation(async ({ firstName, lastName, email }: UserData) => {
        await api.put('/dashboard/users/update', {
            firstName,
            lastName,
            email
        });
    })

    async function handleUpdateUserAvatar(e: FormEvent) {
        e.preventDefault();

        const formData = new FormData();

        formData.append('avatar', avatarFile);

        await updateUserAvatar.mutateAsync({
            avatar: formData.get('avatar')
        })
    }
    
    async function handleUpdateUserData({ firstName, lastName, email }: UserData) {  
        await updateUserData.mutateAsync({ firstName, lastName, email });

        reset()

        Router.push('/home')
    }

    return (
        <DefaultLayout>
            <ProfileContainer>
                <Heading>
                    <h1>Meu Perfil</h1>

                    <span>{`${user?.firstName} ${user?.lastName}`}</span>
                </Heading>

                <AvatarFormContainer onSubmit={handleUpdateUserAvatar}>
                    <img src="/leo.png" alt={user?.firstName} className="userAvatar" />

                    <input 
                        id="avatar-file" 
                        type="file" 
                        hidden
                        onChange={e => setAvatarFile(e.target.files[0])}
                    />

                    <label htmlFor="avatar-file">
                        Carregar imagem
                    </label>

                    {avatarFile && (
                        <FileSelected 
                            name={avatarFile?.name} 
                            onDelete={() => setAvatarFile(null)} 
                        />
                    )}

                    <Button 
                        title="Atualizar foto" 
                        type="submit"
                        disabled={isUpdateAvatarButtonDisabled} 
                    />
                </AvatarFormContainer>

                <DataFormContainer onSubmit={handleSubmit(handleUpdateUserData)}>
                    <InputGroup>
                        <label htmlFor="firstName">
                            Primeiro Nome
                        </label>

                        <Input
                            id="firstName"
                            {...register('firstName')}
                            placeholder="Digite o seu primeiro nome aqui"
                        />
                    </InputGroup>

                    <InputGroup>
                        <label htmlFor="lastName">
                            Último Nome
                        </label>

                        <Input
                            id="lastName"
                            {...register('lastName')}
                            placeholder="Digite o seu último nome aqui"
                        />
                    </InputGroup>

                    <InputGroup>
                        <label htmlFor="email">
                            E-mail
                        </label>

                        <Input
                            id="email"
                            {...register('email')}
                            placeholder="Digite o seu email aqui"
                        />
                    </InputGroup>

                    <Button 
                        title="Atualizar dados"
                        type="submit"
                    />
                </DataFormContainer>
            </ProfileContainer>
        </DefaultLayout>
    );
}

export const getServerSideProps = withSSRAuth(async ctx => {
    return {
      props: {}
    }
})