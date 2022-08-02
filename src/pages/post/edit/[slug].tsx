import { FormEvent, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Converter } from 'showdown'

import { Button } from '../../../components/Button'
import { DropImage } from '../../../components/DropImage'
import { FileSelected } from '../../../components/FileSelected'
import { Input } from '../../../components/Input'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { api } from '../../../services/api'

import { withSSRAuth } from '../../../utils/withSSRAuth'

import { 
  CreatePublicationContainer, 
  FormContainer, 
  ButtonsWrapper, 
  InputGroup,
  Select
} from '../../../styles/pages/createPublication'

interface Category {
  id: string;
  name: string;
}

interface Publication {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  category: Category
}

interface CreatePublicationProps {
  publication: Publication;
}

type PostData = {
  title: string;
  subtitle?: string;
  banner?: File | string;
  content?: string;
  categoryId: string;
}

const showDown = new Converter()

export default function CreatePublication({ publication }: CreatePublicationProps) {
  const [title, setTitle] = useState(publication.title)
  const [subtitle, setSubtitle] = useState(publication.subtitle)
  const [banner, setBanner] = useState<any>('')
  const [categoryId, setCategoryId] = useState(publication.category.id)
  const editorRef = useRef<any>(null)

  const { data: allCategories } = useQuery(['allCategories'], async () => {
    return await api.get<Category[]>('/dashboard/categories')
  })

  function handleChangeImage(image: File) {
    setBanner(image)
  }

  function handleDeleteImageSelected() {
    setBanner(null)
  }

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  const updatePost = useMutation(async ({ title, subtitle, banner, content, categoryId }: PostData) => {
    await api.put(`/posts/update/${publication.id}`, {
      title,
      subtitle, 
      banner,
      content, 
      categoryId, 
    }, config)
  })

  async function handleUpdatePublication(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData();

    formData.append('banner', banner);

    await updatePost.mutateAsync({
      title,
      subtitle,
      banner: formData.get('banner'),
      content: editorRef.current?.getContent(),
      categoryId
    })

    setTitle('')
    setSubtitle('')
    setBanner(null)
    setCategoryId('')
    editorRef.current = null
  }

  return (
    <DefaultLayout>
      <CreatePublicationContainer>
        <h1>
          Editar <span>publicação</span>
        </h1>

        <FormContainer onSubmit={handleUpdatePublication}>
          <InputGroup>
            <label htmlFor="title">
              Título<span>*</span>
            </label>

            <Input 
              id="title"
              placeholder="Iniciando no javascript com.." 
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="subtitle">Subtítulo</label>

            <Input 
              id="subtitle" 
              placeholder="como funciona o ES6.."
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <label>
              Banner<span>*</span>
            </label>

            <DropImage onChangeImage={handleChangeImage} />

            {banner && (
              <FileSelected
                name={banner.name}
                onDelete={handleDeleteImageSelected}
              />
            )}
          </InputGroup>

          <InputGroup>
            <label>
              Conteúdo<span>*</span>
            </label>

            <Editor
              apiKey="qhq3eshbwm8qjodb61oo1f5gp3ynzh1flldd1q18pvb0dvp6"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={publication.content}
              
              init={{
                height: 668,
                menubar: true,
                plugins: [
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'print',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'paste',
                  'code',
                  'help',
                  'wordcount',
                  'list',
                ],
                toolbar:
                  'undo redo | formatselect |' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                link_context_toolbar: true,
              }}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="category">
              Categoria<span>*</span>
            </label>

            <Select 
              id="category" 
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
            >
              {allCategories?.data.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </InputGroup>

          <ButtonsWrapper>
            <Button 
              type="submit" 
              title="Atualizar"
            />
          </ButtonsWrapper>
        </FormContainer>
      </CreatePublicationContainer>
    </DefaultLayout>
  )
}

export const getServerSideProps = withSSRAuth(async ({ params }) => {
  const { slug } = params

  const publication = await api.get<Publication>(`/posts/post-by-slug/${slug}`)

  const formattedPublication = {
    id: publication.data.id,
    title: publication.data.title,
    subtitle: publication.data.subtitle,
    category: {
      id: publication.data.category.id,
      name: publication.data.category.name
    },
    content: showDown.makeHtml(publication.data.content)
  }

  return {
    props: {
      publication: formattedPublication
    }
  }
})