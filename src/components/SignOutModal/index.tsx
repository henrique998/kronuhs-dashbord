import Modal from 'react-modal'
import { useAuth } from '../../hooks'
import {
  ButtonContainer,
  ButtonsWrapper,
  SignOutModalContainer,
} from './styles'

interface SignOutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignOutModal({ isOpen, onClose }: SignOutModalProps) {
  const { signOut } = useAuth()

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <SignOutModalContainer>
        <h1>Sair</h1>

        <p>
          Você tem certeza de que deseja <span>sair?</span>
        </p>

        <ButtonsWrapper>
          <ButtonContainer variant="red" onClick={onClose}>
            Cancelar
          </ButtonContainer>

          <ButtonContainer variant="green" onClick={signOut}>
            Sim, eu quero!
          </ButtonContainer>
        </ButtonsWrapper>
      </SignOutModalContainer>
    </Modal>
  )
}
