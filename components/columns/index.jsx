import React from "react";
import Card from "../card";
import styles from "./columns.module.css"
import { VscCollapseAll } from "react-icons/vsc";


const Column = ({ title, tasks, openModal }) => {
    return (
        <div className={styles.container} >
            <div className={styles.top}>
            <h3 className={styles.title}>{title}</h3>
            {title === "To Do" && (   <button onClick={openModal} className={styles.addButton}>+</button> )}
            <VscCollapseAll  className={styles.collapseIcon}/>
            </div>
            <div className={styles.taskList}>
                {tasks.length ? (
                    tasks.map(task => <Card key={task._id} task={task} />)
                ) : (
                    <p>No tasks in this category</p>
                )}
            </div>
        </div>
    );
};

export default Column;
