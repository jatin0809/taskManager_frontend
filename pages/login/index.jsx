import React, { useState } from 'react'
import Form from '../../components/form';
import styles from './login.module.css';
import main from "../../src/assets/main.png";
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const pretoken = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    name: false,
    password: false,
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
        name: "email",
        type: "email",
        placeholder: "Enter your email",
        value: formData.email,
        onChange: handleChange
    },
    {
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        value: formData.password,
        onChange: handleChange
    }
  ]

  const onSubmit = async (e) =>{
    if(pretoken){
      navigate("/dashboard");
      alert("Some User Already logged in")
    }
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
      try {
        const res = await login(formData);
      if(res.status === 200){
        alert("Logged In Successfully");
        const token = res.data.token;
        localStorage.setItem("token", token)
        navigate("/dashboard");
      }
      else if (res.status === 401){
        alert("Invalid email or password");
      }
      else{
        alert("Something went wrong");
      }
      } catch (error) {
        alert("Something went wrong, try again")
      }
    }

    console.log(error);
  }

  const errorMessages = {
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
    }
  }
  

  return (
    <div className={styles.registerContainer}>
      <div className={styles.imageContainer}>
          <img src={main} alt="Login image" />
        </div>
      <div className={styles.formContainer}>
        <h1>Login</h1>
        <Form error={error}  formFields={formFields} onSubmit={onSubmit} errorMessages={errorMessages} buttonLabel="Login" />
      </div>
    </div>
  );
}
