import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { NotePencil, PencilSimpleLine, Trash } from 'phosphor-react'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { api } from '../services/api'

import { withSSRAuth } from '../utils/withSSRAuth'

import { Heading, TableContainer, PublicationsContainer, Badge } from '../styles/pages/publications'
import { useState } from 'react'
import { DeletePublicationModal } from '../components/DeletePublicationModal'
import { useRouter } from 'next/router'
import { formatDate } from '../utils/formatDate'
import { Pagination } from '../components/Pagination'
import { CanSeeComponent } from '../components/CanSeeComponent'

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

interface IResponse {
  total: number;
  posts: Publication[];
}

export default function MyPublications() {
  const [isDeletePublicationModalOpen, setIsDeletePublicationModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter()

  const { data: response } = useQuery(['myAllPublications', currentPage], async () => {
    return await api.get<IResponse>(`/posts/my-posts?page=${currentPage}`)
  })

  const myAllPublicationsCount = response?.data.total;

  const myAllPublications = response?.data.posts 

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
        <h1>Minhas <span>Publicações</span></h1>

        <Heading>
          <h3>
            Todas as minhas publicações <strong>({myAllPublicationsCount})</strong>
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
              <th>Criado em</th>
              <th>Url</th>
              <th></th>
              <CanSeeComponent
                roles={[ { name: 'admin' } ]}
              >
                <th></th>
              </CanSeeComponent>
            </tr>
          </thead>

          <tbody>
            {myAllPublications?.map(publication => (
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

                  <td>{formatDate(publication.createdAt.toString())}</td>

                  <td>
                    <a
                      href={`http://localhost:3001/post/${publication.slug}`}
                      target={'_blank'}
                      rel="noreferrer"
                      title={`http://localhost:3001/post/${publication.slug}`}
                    >
                      {`http://localhost:3001/post/${publication.slug}`}                  
                    </a>
                  </td>

                  <td>
                    <Link href={`post/edit/${publication.slug}`}>
                      <a className="buttonPencil">
                        <PencilSimpleLine size={24} />
                      </a>
                    </Link>
                  </td>

                  <CanSeeComponent
                    roles={[ { name: "admin" } ]}
                  >
                    <td>
                      <button 
                        className="buttonTrash"
                        onClick={() => handleOpenModal()}
                      >
                        <Trash size={24} />
                      </button>
                    </td>
                  </CanSeeComponent>
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

        <Pagination 
          onPageChage={setCurrentPage}
          totalCountOfUsers={myAllPublicationsCount}
          currentPage={currentPage}
        />
      </PublicationsContainer>
    </DefaultLayout>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})