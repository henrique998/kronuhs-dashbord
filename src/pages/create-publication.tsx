import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Button } from '../components/Button'
import { DropImage } from '../components/DropImage'
import { FileSelected } from '../components/FileSelected'
import { Input } from '../components/Input'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { api } from '../services/api'
import { withSSRAuth } from '../utils/withSSRAuth'

import { 
  CreatePublicationContainer, 
  FormContainer, 
  ButtonsWrapper, 
  InputGroup, 
  StatusContainer
} from '../styles/pages/createPublication'
import { useForm } from 'react-hook-form'
import { InputErrorMessage, Select } from '../styles/pages/addUser'
import { WarningCircle } from 'phosphor-react'
import Router from 'next/router'

interface Category {
  id: string;
  name: string;
}

interface PostData {
  title: string;
  subtitle?: string;
  banner?: File | string;
  content?: string;
  isDraft?:boolean;
  categoryId: string;
}

const createPublicationValidationSchema = zod.object({
  title: zod.string().min(1, 'Campo obrigatório'),
  categoryId: zod.string().min(1, 'Campo obrigatório'),
})

export default function CreatePublication() {
  const [banner, setBanner] = useState<any>('')
  const [isBannerErr, setIsBannerErr] = useState(false)
  const [isTitleErr, setIsTitleErr] = useState(false)
  const [isContentErr, setIsContentErr] = useState(false)
  const [isCategoryErr, setIsCategoryErr] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const editorRef = useRef<any>(null)

  const { data: allCategories } = useQuery(['allCategories'], async () => {
    return await api.get<Category[]>('/dashboard/categories')
  })

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  const createPost = useMutation(async ({ title, subtitle, banner, content, isDraft, categoryId }: PostData) => {
    await api.post('/posts', {
      title,
      subtitle, 
      banner,
      content, 
      categoryId, 
      isDraft
    }, config)
  })

  function handleChangeImage(image: File) {
    setBanner(image)
    setIsBannerErr(false)
  }

  function handleDeleteImageSelected() {
    setBanner(null)
  }

  async function handleCreatePublication({ title, subtitle, categoryId }: PostData) {
    if (!title) {
      setIsTitleErr(true)
    }
    
    if (!banner) {
      setIsBannerErr(true)
    } 

    if (editorRef.current.getContent() === '') {
      setIsContentErr(true)
    }

    if (!categoryId) {
      setIsCategoryErr(true)
    }

    const formData = new FormData();

    formData.append('banner', banner);

    if (isDraft) {
      await createPost.mutateAsync({
        title,
        subtitle,
        banner: formData.get('banner'),
        content: editorRef.current?.getContent(),
        isDraft: true,
        categoryId,
      })
  
      Router.push('/home')
    } else {
      await createPost.mutateAsync({
        title,
        subtitle,
        banner: formData.get('banner'),
        content: editorRef.current?.getContent(),
        isDraft: false,
        categoryId,
      })
  
      Router.push('/home')
    }
  }

  const { register, handleSubmit } = useForm()

  return (
    <DefaultLayout>
      <CreatePublicationContainer>
        <h1>
          Criar <span>publicação</span>
        </h1>

        <FormContainer onSubmit={handleSubmit(handleCreatePublication)}>
          <InputGroup>
            <label htmlFor="title">
              Título<span>*</span>
            </label>

            <Input 
              id="title"
              placeholder="Iniciando no javascript com.."
              {...register('title', { onChange: () => setIsTitleErr(false) })}
              isError={isTitleErr}
            />

            {isTitleErr && (
              <InputErrorMessage>
                <WarningCircle size={16} />
                
                Campo obrigatório
              </InputErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label htmlFor="subtitle">Subtítulo</label>

            <Input 
              id="subtitle" 
              placeholder="como funciona o ES6.."
              {...register('subtitle')}
            />
          </InputGroup>

          <InputGroup>
            <label>
              Banner<span>*</span>
            </label>

            <DropImage 
              onChangeImage={handleChangeImage} 
              isError={isBannerErr} 
            />

            {banner && (
              <FileSelected
                name={banner.name}
                onDelete={handleDeleteImageSelected}
              />
            )}

            {isBannerErr && (
              <InputErrorMessage>
                <WarningCircle size={16} />
                
                Campo obrigatório
              </InputErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label>
              Conteúdo<span>*</span>
            </label>

            <Editor
              apiKey="qhq3eshbwm8qjodb61oo1f5gp3ynzh1flldd1q18pvb0dvp6"
              onInit={(evt, editor) => (editorRef.current = editor)}
              onFocus={() => setIsContentErr(false)}
              init={{
                height: 500,
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

            {isContentErr && (
              <InputErrorMessage>
                <WarningCircle size={16} />
                
                Campo obrigatório
              </InputErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label htmlFor="categoryId">
              Categoria<span>*</span>
            </label>

            <Select 
              {...register('categoryId', { onChange: () => setIsCategoryErr(false) })} 
              isError={isCategoryErr}
            >
              {allCategories?.data.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>

            {isCategoryErr && (
              <InputErrorMessage>
                <WarningCircle size={16} />
                
                Campo obrigatório
              </InputErrorMessage>
            )}
          </InputGroup>

          <ButtonsWrapper>
            <Button 
              type="submit" 
              title="Publicar como rascunho" 
              isDraft
              onClick={() => setIsDraft(true)}
            />

            <Button 
              type="submit" 
              title="Publicar"
              onClick={() => setIsDraft(false)}
            />
          </ButtonsWrapper>
        </FormContainer>
      </CreatePublicationContainer>
    </DefaultLayout>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})