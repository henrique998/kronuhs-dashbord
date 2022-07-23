import Modal from 'react-modal'
import { useAuth } from '../../hooks'
import {
  ButtonContainer,
  ButtonsWrapper,
  DeletePublicationModalContainer,
} from './styles'

interface DeletePublicationModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

export function DeletePublicationModal({ isOpen, onClose, onDelete }: DeletePublicationModalProps) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <DeletePublicationModalContainer>
        <h1>Deletar Publicação</h1>

        <p>
          Você tem certeza de que deseja <span>deletar</span> esta publicação?
        </p>

        <ButtonsWrapper>
          <ButtonContainer variant="red" onClick={onClose}>
            Cancelar
          </ButtonContainer>

          <ButtonContainer variant="green" onClick={onDelete}>
            Sim, tenho certeza!
          </ButtonContainer>
        </ButtonsWrapper>
      </DeletePublicationModalContainer>
    </Modal>
  )
}
