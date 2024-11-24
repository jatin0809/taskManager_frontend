import React from 'react'
import styles from "./basic.module.css"
import Modal from 'react-modal';


export default function BasicModal({ isOpen, onRequestClose, onConfirm }) {
  return (
    <Modal  isOpen={isOpen}   onRequestClose={onRequestClose}   className={styles.modal}   overlayClassName={styles.overlay}
            ariaHideApp={false} // Set to false if your app does not have an accessibility root element
          >
            <h2 className={styles.message}>Are you sure that you want to logout?</h2>
            <div className={styles.buttonContainer}>
                <button className={styles.confirmButton} onClick={onConfirm}>Yes, Logout</button>
                <button className={styles.cancelButton} onClick={onRequestClose}>Cancel</button>
            </div>
    </Modal>
  )
}
