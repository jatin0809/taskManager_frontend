import React, { useEffect } from 'react'
import styles from "./board.module.css";
import { useState } from 'react';
import CreateTaskModal from '../../modals/task';
import TaskBoard from '../../components/taskBoard';


export default function Board() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>board</h1>

        <CreateTaskModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <div className={styles.body}>
        <TaskBoard openModal={openModal}/>
      </div>
    </div>
  )
}
