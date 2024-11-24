// TaskForm.js
import React from 'react';
import styles from './taskForm.module.css';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';


const TaskForm = ({ title,  onTitleChange,  priority,  onPriorityChange,  admins,  onAddAdmin,  onRemoveAdmin,  taskList,  onAddTask,
            onRemoveTask,  onTaskChange,  onToggleTask,  dueDate,  onDueDateChange,  onFormSubmit, userList, onClose
}) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleToggleAdmin = (user) => {
        if (selectedEmails.includes(user.email)) {
            // Remove user if already selected
            setSelectedEmails((prev) => prev.filter((email) => email !== user.email));
            onRemoveAdmin(user._id);
        } else {
            // Add user if not selected
            setSelectedEmails((prev) => [...prev, user.email]);
            onAddAdmin(user._id);
        }
    };

      const handleClickInsideForm = () => {
        if(isDropdownOpen){
            setDropdownOpen(false);
        }
    };


    return (
        <form className={styles.form} onSubmit={onFormSubmit} onClick={handleClickInsideForm}>
            <div className={styles.field}>
                <div>
                <label className={styles.label }>Title<span className={styles.required}>*</span></label> 
                <br />
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={onTitleChange}
                    required
                    className={styles.inputField}
                />
                </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Select Priority<span className={styles.required}>*</span></label>
                <div className={styles.priorityOptions}>
                    {["high", "moderate", "low"].map((p, index) => (
                        <div
                            key={p}
                            className={`${styles.priorityBox} ${priority === p ? styles.selected : ''}`}
                            onClick={() => onPriorityChange(p)}
                        >
                            <span className={`${styles.priorityDot} ${styles[`priorityDot${index}`]}`}></span>
                            {p.toUpperCase()} PRIORITY
                        </div>
                    ))}
                </div>
            </div>

            {taskList.length > 0 && (
                <div className={styles.field}>
                <label className={styles.label}>Assign to</label>
                <div className={styles.dropdownContainer}>
                    <div className={styles.dropdownBox} onClick={toggleDropdown}>
                        {selectedEmails.join(", ") || "Select Assignees"}
                    </div>
                    {isDropdownOpen && (
                        <div className={styles.dropdownList}>
                            {userList.map((user) => (
                                <div key={user._id} className={styles.dropdownItem}>
                                    <span className={styles.userCircle}>
                                        {user.email.slice(0, 2).toUpperCase()}
                                    </span>
                                    <span>{user.email}</span>
                                    <button
                                        type="button"
                                        className={styles.assignButton}
                                        onClick={() => handleToggleAdmin(user)}
                                    >
                                        {selectedEmails.includes(user.email) ? "Remove" : "Assign"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            )}



            <div className={styles.field}>
                <div className={styles.checklistContainer}>
                    <label className={styles.label}>
                        Checklist<span className={styles.required}>*</span> ({taskList.filter((t) => t.completed).length}/{taskList.length})
                    </label>
                    <div className={styles.taskList}>
                        {taskList.map((task, index) => (
                            <div key={index} className={styles.taskItem}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => onToggleTask(index)}
                                    className={styles.taskCheckbox}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter task"
                                    value={task.task}
                                    onChange={(e) => onTaskChange(index, e.target.value)}
                                    className={styles.taskInput}
                                />
                                <FaTrashAlt
                                    onClick={() => onRemoveTask(index)}
                                    className={styles.deleteIcon}
                                />
                            </div>
                        ))}
                    </div>
                        <button type="button" onClick={onAddTask} className={styles.addButton}>+ Add New</button>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.dateSection}>
                   
                    <input
                        type="date"
                        className={styles.dateFeild}
                        value={dueDate ? dueDate.toISOString().substring(0, 10) : ""}
                        onChange={(e) => onDueDateChange(new Date(e.target.value))}
                    />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.cancelButton} type="button" onClick={() => onClose() }>Cancel</button>
                    <button className={styles.submitButton} type="submit">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default TaskForm;
