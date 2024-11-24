import axios from "axios";
import { addTokenToHeader } from "../helper";

export const register = async (data) =>{
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/register`, data, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        }
    });
    return res;
}

export const login = async (data) => {
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/login`, data, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        }
    });
    return res;
}

export const getUserByEmail = async (email) =>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/${email}`);
    return res.data;
}

export const updateUser = async (data, id) =>{
    const headers = addTokenToHeader({headers: {}});
    const res = axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/user/${id}`, data, {
        headers
    });
    return res;
}
