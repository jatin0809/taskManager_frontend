import React, { useState } from 'react';
import Form from '../../components/userForm/form';
import styles from './updateUser.module.css';
import main from "../../src/assets/main.png";
import {updateUser} from "../../services/auth";
import { useNavigate } from 'react-router-dom';
import { getPayloadFromToken } from '../../helper';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";

export default function Settings() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        oldPassword: "",
        newPassword: ""
    });

    const [error, setError] = useState({
        name: false,
        email: false,
        oldPassword: false,
        newPassword: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (error[name]) {
            setError((prev) => ({ ...prev, [name]: false }));
        }
    };

    const formFields = [
        {
            name: "name",
            type: "text",
            placeholder: "Name",
            value: formData.name,
            onChange: handleChange,
            icon: <FaRegUser />
        },
        {
            name: "email",
            type: "email",
            placeholder: "Update Email",
            value: formData.email,
            onChange: handleChange,
            icon: <MdOutlineMail />
        },
        {
            name: "oldPassword",
            type: "password",
            placeholder: "Old Password",
            value: formData.oldPassword,
            onChange: handleChange,
            icon: <MdLockOutline />
        },
        {
            name: "newPassword",
            type: "password",
            placeholder: "New Password",
            value: formData.newPassword,
            onChange: handleChange,
            icon: <MdLockOutline />
        }
    ];

    const onSubmit = async (e) => {
        e.preventDefault();
        let isError = false;

        Object.keys(errorMessages).forEach(key => {
            if (!errorMessages[key].isValid) {
                isError = true;
                errorMessages[key].onError();
            }
        });

        if (!isError) {
            try {
              const token = localStorage.getItem("token");
              const payload = getPayloadFromToken(token)
              const userId = payload.id;

                const res = await updateUser(formData, userId);
                if (res.status === 200) {
                    alert("User updated successfully");
                    navigate("/dashboard");
                } else {
                    alert("Error updating user");
                }
            } catch (err) {
                alert("Update failed. Please check your inputs");
                console.error(err);
            }
        }
    };

    const errorMessages = {
        name: {
            message: "Name is required",
            isValid: formData.name.length > 0,
            onError: () => setError((error) => ({ ...error, name: true }))
        },
        email: {
            message: "Email is required",
            isValid: formData.email.length > 0,
            onError: () => setError((error) => ({ ...error, email: true }))
        },
        oldPassword: {
            message: "Old password is required",
            isValid: formData.oldPassword.length > 0,
            onError: () => setError((error) => ({ ...error, oldPassword: true }))
        },
        newPassword: {
            message: "New password is required",
            isValid: formData.newPassword.length > 0,
            onError: () => setError((error) => ({ ...error, newPassword: true }))
        }
    };

    return (
        <div className={styles.updateUserContainer}>
            
            <div className={styles.formContainer}>
                <span className={styles.title}>Settings</span>
                <Form
                    error={error}
                    formFields={formFields}
                    onSubmit={onSubmit}
                    errorMessages={errorMessages}
                    buttonLabel="Update"
                />
            </div>
        </div>
    );
}