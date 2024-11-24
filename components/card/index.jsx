import React, { useState } from 'react';
import styles from './Card.module.css';
import { BsThreeDots } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";



const Card = ({ task, updateTaskStatus, toggleTaskCompletion }) => {
  // State to toggle checklist visibility
  const [isChecklistVisible, setIsChecklistVisible] = useState(false);

  // Handle arrow click to toggle checklist visibility
  const toggleChecklist = () => {
    setIsChecklistVisible(!isChecklistVisible);
  };

  // Calculate the checked/total tasks for the checklist
  const completedTasksCount = task.taskList ? task.taskList.filter((item) => item.completed).length : 0;
  const totalTasksCount = task.taskList ? task.taskList.length : 0;

  const formatDueDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options).replace(',', ''); // Remove comma for the desired format
  };


  return (
    <div className={styles.card}>
      {/* Priority and options */}
      <div className={styles.cardHeader}>
        <span className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}>
          <span className={styles.dot}></span>
          {task.priority.toUpperCase()} PRIORITY
        </span>
        <button className={styles.optionsButton}><BsThreeDots /></button>
      </div>

      {/* Title */}
      <h2 className={styles.title}>{task.title}</h2>

      {/* Checklist and Arrow Toggle */}
      <div className={styles.checklistHeader}>
        <span>Checklist ({completedTasksCount}/{totalTasksCount})</span>
        <button onClick={toggleChecklist} className={styles.arrowButton}>
          {isChecklistVisible ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
      </div>

      {/* Checklist Items */}
      {isChecklistVisible && task.taskList && (
        <div className={styles.checklistItems}>
          {task.taskList.map((item, index) => (
            <div key={index} className={styles.checklistItem}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTaskCompletion(task.id, index)}
              />
              <span className={styles.checklistText}>{item.task}</span> {/* Ensure the text is displayed here */}
            </div>
          ))}
        </div>
      )}

      {/* Footer with Due Date and Statuses */}
      <div className={styles.footer}>
        <div
          className={styles.dueDate}
          style={{
            backgroundColor: new Date(task.dueDate) < new Date() ? 'red' : 'gray',
            color: new Date(task.dueDate) < new Date() ? 'white' : 'black',
          }}
        >
          {formatDueDate(task.dueDate)}
        </div>
        <div className={styles.statusContainer}>
          {['PROGRESS', 'BACKLOG', 'TO-DO', 'DONE'].map((status) => (
            status !== task.currentStatus && (
              <button
                key={status}
                className={styles.statusButton}
                onClick={() => updateTaskStatus(task.id, status)}
              >
                {status}
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
