import Modal from './ucModal'
import { useModal } from './useModalHook'

 const Modals = () => {
   const[isOpenModal,openModal, closeModal] =useModal(false)

  return (
    <div>
    <h2>popup Modal</h2>
    <button onClick={openModal}>Modal 1</button>
    <Modal isOpen={isOpenModal} closeModal={closeModal}>
    prueba
    </Modal>
    </div>
  )
}

export default Modals