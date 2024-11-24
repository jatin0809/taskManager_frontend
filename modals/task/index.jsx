import React from 'react'
import Modal from 'react-modal';
import { TaskFormData } from '../../pages';
import styles from "./modal.module.css"

Modal.setAppElement('#root'); // Accessibility

export default function CreateTaskModal({ isOpen, onClose }) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <TaskFormData  onClose={onClose} />
    </Modal>
  )
}
