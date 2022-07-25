import Modal from 'react-modal'
import { useAuth } from '../../hooks'
import {
  ButtonContainer,
  ButtonsWrapper,
  DeleteUserModalContainer,
} from './styles'

interface DeleteUserModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

export function DeleteUserModal({ isOpen, onClose, onDelete }: DeleteUserModalProps) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <DeleteUserModalContainer>
        <h1>Deletar Usuário</h1>

        <p>
          Você tem certeza de que deseja <span>deletar</span> este usuário?
        </p>

        <ButtonsWrapper>
          <ButtonContainer variant="red" onClick={onClose}>
            Cancelar
          </ButtonContainer>

          <ButtonContainer variant="green" onClick={onDelete}>
            Sim, tenho certeza!
          </ButtonContainer>
        </ButtonsWrapper>
      </DeleteUserModalContainer>
    </Modal>
  )
}
