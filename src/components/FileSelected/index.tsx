import { XCircle } from 'phosphor-react'
import { FileSelectedContainer } from './styles'

interface FileSelectedProps {
  name: string
  onDelete: () => void
}

export function FileSelected({ name, onDelete }: FileSelectedProps) {
  return (
    <FileSelectedContainer>
      <span>{name}</span>

      <button type="button" onClick={onDelete}>
        <XCircle size={20} weight="fill" color="#D9D9D9" />
      </button>
    </FileSelectedContainer>
  )
}
