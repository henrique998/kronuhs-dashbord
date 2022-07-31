import { useState } from 'react'
import { DropImageContainer, Wrapper } from './styles'

interface DropImageProps {
  onChangeImage: (image: File) => void
  isError?: boolean
}

export function DropImage({ onChangeImage, isError }: DropImageProps) {
  const [isDraging, setIsDragin] = useState(false)

  return (
    <DropImageContainer
      onDragOver={() => setIsDragin(true)}
      onDragLeave={() => setIsDragin(false)}
      onDragEnter={() => setIsDragin(false)}
      isDragin={isDraging}
      isError={isError}
    >
      <Wrapper>
        <img src="/image-ilustration.svg" alt="image ilustration" />

        <p>
          Arraste e solte uma image ou <label htmlFor="photo">Procure</label>
        </p>

        <span>Formatos suportados: PNG, JPEG, JPG</span>

        <input
          type="file"
          id="photo"
          onChange={(e) => onChangeImage(e.target.files[0])}
        />
      </Wrapper>
    </DropImageContainer>
  )
}
