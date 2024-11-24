import axios from "axios";
import { addTokenToHeader } from "../helper";


// get all users
export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user`);
        return res.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

// create Task
export const createTask = async (taskData) => {
    try {
        const headers = addTokenToHeader({headers: {}});
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/task/create`, taskData,{
             headers
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

// get all tasks
export const getTask = async () => {
    try {
        const headers = addTokenToHeader({headers: {}});
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/task`, {
             headers
            }
        );
        return res.data;
    } catch (error) {
        console.error('Error getting task:', error);
        throw error;
    }
}