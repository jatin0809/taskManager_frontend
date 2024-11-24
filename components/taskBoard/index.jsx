import React, { useEffect, useState } from "react";
import Column from "../columns";
import { getTask } from "../../services/tasks";
import styles from "./taskBoard.module.css"

const TaskBoard = ({openModal}) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from backend
        const fetchTasks = async () => {
            try {
                const data = await getTask(); // Assume this fetches an array of tasks
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Categorize tasks based on `category`
    const categorizedTasks = {
        backlog: tasks.filter(task => task.category === "Backlog"),
        todo: tasks.filter(task => !task.category || task.category === "To do"),
        inProgress: tasks.filter(task => task.category === "In progress"),
        done: tasks.filter(task => task.category === "Done"),
    };

    return (
        <div className={styles.container} >
            <Column title="Backlog" tasks={categorizedTasks.backlog}  />
            <Column openModal={openModal} title="To Do" tasks={categorizedTasks.todo} />
            <Column title="In Progress" tasks={categorizedTasks.inProgress} />
            <Column title="Done" tasks={categorizedTasks.done} />
        </div>
    );
};

export default TaskBoard;
