import React, { useState } from 'react'
import Form from '../../components/userForm/form';
import styles from './register.module.css';
import { register } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import Poster from '../../components/poster';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
    if(error[name]){
      setError((prev)=> ({...prev, [name]: false}))
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
        placeholder: "Email",
        value: formData.email,
        onChange: handleChange,
        icon: <MdOutlineMail />
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password",
        value: formData.password,
        onChange: handleChange,
        icon: <MdLockOutline />
    }, {
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm Password",
        value: formData.confirmPassword,
        onChange: handleChange,
        icon: <MdLockOutline />
    }
  ]

  const onSubmit = async (e) =>{
    let isError = false;
    e.preventDefault();
    console.log(formData);  

    Object.keys(errorMessages).forEach(key => {
      if(!errorMessages[key].isValid){
        isError = true;
        errorMessages[key].onError();
      }
    });
    if(!isError){
      const res = await register(formData);
      if(res.status === 201){
        alert("Registered Successfully");
        navigate("/login");
      }
      else{
        alert("Something went wrong");
      }
    }

    console.log(error);
  }

  const errorMessages = {
    name: {
        message: "Name is required",
        isValid: formData.name.length > 0,
        onError: () => {
            setError((error) => ({ ...error, name: true }))
        }
    },
    email: {
        message: "Email is required",
        isValid: formData.email.length > 0,
        onError: () => {
            setError((error) => ({ ...error, email: true }))
        }
    },
    password: {
        message: "Password is required",
        isValid: formData.password.length > 0,
        onError: () => {
            setError((error) => ({ ...error, password: true }))
        }
    },
    confirmPassword: {
        message: "Passwords do not match",
        isValid: formData.confirmPassword === formData.password,
        onError: () => {
            setError((error) => ({ ...error, confirmPassword: true }))
        }
    }
  }
  

  return (
    <div className={styles.registerContainer}>
      <div className={styles.left}>
        <Poster/>
        </div>
      <div className={styles.formContainer}>
        <h1>Register</h1>
        <Form error={error}  formFields={formFields} onSubmit={onSubmit} errorMessages={errorMessages} buttonLabel="Register" />
        <p className={styles.para}>Have an account ?</p>
        <button  className={styles.loginButton} onClick={()=> navigate("/login")} >Log in</button>
      </div>
    </div>
  );
}
