import { useState } from "react";
import styles from "./form.module.css";
import view from "../src/assets/view.png";
import hide from "../src/assets/hide.png"

function FormFeild({name, type, placeholder, value, onChange, togglePassword}){
    return(
        <div className={styles.inputWrapper}>
            
            <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} className={styles.inputFeild}/>
            {name === "password" || name === "confirmPassword" ? (
                <span className={styles.eyeIcon} onClick={togglePassword}>
                    {type === "password" ? <img src={view} /> : <img  src={hide}/>}
                </span>
            ) : null }
            <span className={styles.inputIcon}> A </span>
        </div>
    );
}

export default function Form({formFields, onSubmit, errorMessages, error, buttonLabel}) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

  return (
    <form  onSubmit={onSubmit}>
        {
            formFields.map((feild, index) =>(
                <div key={feild.name} className={styles.formFeild}>
                    <FormFeild value={feild.value} onChange={feild.onChange} key={index} name={feild.name} placeholder={feild.placeholder}
                        type={feild.name.includes("password") && showPassword ? "text" : feild.type}
                        togglePassword={feild.name.includes("password")? togglePassword : null}
                    />
                    {error[feild.name] ? <p className={styles.errorMessage} >{errorMessages[feild.name].message}</p> : null}
                </div>
            ))
        }
        <button type="submit" className={styles.submitButton}>{buttonLabel}</button>
    </form>
  );
}
