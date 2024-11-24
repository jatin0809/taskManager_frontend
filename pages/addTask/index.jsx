// TaskFormData.js
import React, { useState } from 'react';
import TaskForm from '../../components/taskForm/taskForm';
import { createTask } from '../../services/tasks';
import { getAllUsers } from '../../services/tasks';
import { useEffect } from 'react';

export default function TaskFormData({onClose}) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("low");
    const [admins, setAdmins] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [dueDate, setDueDate] = useState(null);
    const [userList, setUserList] = useState([]);

useEffect(() => {
    const fetchUsers = async () => {
        try {
            const userListData = await getAllUsers();
            setUserList(userListData.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    fetchUsers();
}, []);
 
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handlePriorityChange = (newPriority) => setPriority(newPriority);

    const handleAddAdmin = (email) => {
        if (!admins.includes(email)) setAdmins([...admins, email]);
    };

    const handleRemoveAdmin = (email) => {
        setAdmins(admins.filter(admin => admin !== email));
    };

    const handleAddTask = () => {
        setTaskList([...taskList, { task: '', completed: false }]);
    };

    const handleRemoveTask = (index) => {
        setTaskList(taskList.filter((_, i) => i !== index));
    };

    const handleTaskChange = (index, newTask) => {
        const updatedTasks = [...taskList];
        updatedTasks[index].task = newTask;
        setTaskList(updatedTasks);
    };

    const handleToggleTask = (index) => {
        const updatedTasks = [...taskList];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTaskList(updatedTasks);
    };

    const handleDueDateChange = (date) => setDueDate(date);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        onClose();
        const userList =  await getAllUsers();
        console.log(userList.users)
        
        const taskData = {
            title,
            priority,
            admins,
            taskList,
            dueDate,
        };
        console.log(taskData)

        try {
            await createTask(taskData);
            alert('Task created successfully');
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task');
        }
    };

    return (
        <div>
            < TaskForm title={title}  onTitleChange={handleTitleChange}  priority={priority}  onPriorityChange={handlePriorityChange}  admins={admins}
            onAddAdmin={handleAddAdmin}  onRemoveAdmin={handleRemoveAdmin}  taskList={taskList}  onAddTask={handleAddTask}  onRemoveTask={handleRemoveTask}  onTaskChange={handleTaskChange}
            onToggleTask={handleToggleTask}  dueDate={dueDate}   onDueDateChange={handleDueDateChange}   onFormSubmit={handleFormSubmit} userList={userList} onClose={onClose}
         />
        </div>
    );
};

