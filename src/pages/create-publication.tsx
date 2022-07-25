import { FormEvent, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useMutation, useQuery } from '@tanstack/react-query'

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
  InputGroup 
} from '../styles/pages/createPublication'

interface Category {
  id: string;
  name: string;
}

// interface PostData {
//   title: string;
//   subtitle?: string;
//   banner: File;
//   content: any;
//   selectedCategory: string;
//   isDraft: boolean;
// }

export default function CreatePublication() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [banner, setBanner] = useState<any>('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isDraft, setIsDraft] = useState(false)
  const editorRef = useRef<any>(null)

  const { data: allCategories } = useQuery(['allCategories'], async () => {
    return await api.get<Category[]>('/dashboard/categories')
  })

  // const createPost = useMutation(async ({ title, subtitle, banner, content, selectedCategory, isDraft }: PostData) => {
    
  // })

  function handleChangeImage(image: File) {
    setBanner(image)

  }

  function handleDeleteImageSelected() {
    setBanner(null)
  }

  async function handleCreatePublication(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData();

    formData.append('banner', banner);

    await api.post('/posts', {
      title, 
      subtitle, 
      banner: formData.get('banner'),
      content: editorRef.current?.getContent(), 
      categoryId: selectedCategory, 
      isDraft
    })

    // console.log({
    //   title, 
    //   subtitle, 
    //   banner: formData.get('banner'),
    //   content: editorRef.current?.getContent(), 
    //   categoryId: selectedCategory, 
    //   isDraft
    // });

    setTitle('')
    setSubtitle('')
    setBanner(null)
    setSelectedCategory('')
    setIsDraft(false)
    editorRef.current = null
  }

  return (
    <DefaultLayout>
      <CreatePublicationContainer>
        <h1>
          Criar <span>publicação</span>
        </h1>

        <FormContainer onSubmit={handleCreatePublication}>
          <InputGroup>
            <label htmlFor="title">
              Título<span>*</span>
            </label>

            <Input 
              id="subtitle"
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
              initialValue=""
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
          </InputGroup>

          <InputGroup>
            <label htmlFor="role">
              Categoria<span>*</span>
            </label>

            <select id="role" onChange={e => setSelectedCategory(e.target.value)}>
              {allCategories?.data.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </InputGroup>

          <ButtonsWrapper>
            <Button 
              type="submit" 
              title="Criar como rascunho" 
              isDraft
              onClick={() => setIsDraft(true)}
            />

            <Button 
              type="submit" 
              title="Criar"
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