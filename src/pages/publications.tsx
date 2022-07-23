import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { NotePencil, PencilSimpleLine, Trash } from 'phosphor-react'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { api } from '../services/api'

import { withSSRAuth } from '../utils/withSSRAuth'

import { Heading, TableContainer, PublicationsContainer, Badge } from '../styles/pages/publications'
import { useState } from 'react'
import { DeletePublicationModal } from '../components/DeletePublicationModal'

interface Publication {
  id: string;
  title: string;
  author: {
    firstName: string;
    avatarUrl: string;
  };
  slug: string;
  isDraft: boolean;
  createdAt: Date;
}

export default function Publications() {
  const [isDeletePublicationModalOpen, setIsDeletePublicationModalOpen] = useState(false)

  const { data: allPublications } = useQuery(['allPublications'], async () => {
    return await api.get<Publication[]>('/posts')
  })

  const deletePublication = useMutation(async (publicationId: string) => {
    await api.delete(`/posts/delete/${publicationId}`)
  })

  function handleOpenModal() {
    setIsDeletePublicationModalOpen(true)
  }

  function handleCloseModal() {
    setIsDeletePublicationModalOpen(false)
  }

  async function handleDeletePublication(publicationId: string) {
    await deletePublication.mutateAsync(publicationId)

    setIsDeletePublicationModalOpen(false)    
  }

  return (
    <DefaultLayout>
      <PublicationsContainer>
        <h1>Publicações</h1>

        <Heading>
          <h3>
            Todas as publicações <strong>({allPublications?.data.length})</strong>
          </h3>

          <Link href="/create-publication">
            <a className="addUserButton">
                <NotePencil size={20} />
                Criar publicação
            </a>
          </Link>
        </Heading>

        <TableContainer>
          <thead>
            <tr>
              <th>Estágio</th>
              <th>Título</th>
              <th>Criado por</th>
              <th>Criado em</th>
              <th>Atualizado em</th>
              <th>Url</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allPublications?.data.map(publication => (
              <>
                <tr key={publication.id}>
                  <td>
                    <Badge isDraft={publication.isDraft}>
                      {publication.isDraft ? 'Rascunho' : 'Publicado'}
                    </Badge>
                  </td>

                  <td>
                    <span title={publication.title} className="title">
                      {publication.title}
                    </span>
                  </td>

                  <td className="authorBox">
                    <img src={publication.author.firstName} alt="léo" />

                    <span title={publication.author.firstName} className="authorName">
                      {publication.author.firstName}
                    </span>
                  </td>

                  <td>{publication.createdAt.toString()}</td>

                  <td>07/12/2021</td>

                  <td>
                    <a
                      href={`http://localhost:3000/post/${publication.slug}`}
                      target={'_blank'}
                      rel="noreferrer"
                      title={`http://localhost:3000/post/${publication.slug}`}
                    >
                      {`http://localhost:3000/post/${publication.slug}`}                  
                    </a>
                  </td>

                  <td>
                    <button 
                      className="buttonPencil" 
                      type="button"
                      onClick={() => alert(`Editar publicação: ${publication.title}`)}
                    >
                      <PencilSimpleLine size={24} />
                    </button>
                  </td>

                  <td>
                    <button 
                      className="buttonTrash" 
                      type="button"
                      onClick={() => handleOpenModal()}
                    >
                      <Trash size={24} />
                    </button>
                  </td>
                </tr>

                <DeletePublicationModal 
                  isOpen={isDeletePublicationModalOpen}
                  onClose={handleCloseModal}
                  onDelete={() => handleDeletePublication(publication.id)}
                />
              </>
            ))}
          </tbody>
        </TableContainer>
      </PublicationsContainer>
    </DefaultLayout>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})