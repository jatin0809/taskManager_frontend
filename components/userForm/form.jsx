import { useState } from "react";
import styles from "./form.module.css";
import view from "../../src/assets/view.png"
import hide from "../../src/assets/hide.png"

function FormFeild({name, type, placeholder, value, onChange, togglePassword,icon}){
    return(
        <div className={styles.inputWrapper}>
            
            <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} className={styles.inputFeild}/>
            {(name === "password" || name === "confirmPassword" || name === "oldPassword" || name === "newPassword") ? (
                <span className={styles.eyeIcon} onClick={togglePassword}>
                    {type === "password" ? <img src={view} /> : <img  src={hide}/>}
                </span>
            ) : null }
            <span className={styles.inputIcon}> {icon} </span>
        </div>
    );
}

export default function Form({formFields, onSubmit, errorMessages, error, buttonLabel}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const togglePassword = (name) => {
        if (name === "password") {
            setShowPassword((prev) => !prev);
        } else if (name === "confirmPassword") {
            setShowConfirmPassword((prev) => !prev);
        } else if (name === "oldPassword"){
            setShowOldPassword((prev) => !prev);
        } else if (name === "newPassword"){
            setShowNewPassword((prev) => !prev);
        }
    };

  return (
    <form  onSubmit={onSubmit} className={styles.container}>
        {
            formFields.map((feild, index) =>(
                <div key={feild.name} className={styles.formFeild}>
                    <FormFeild icon={feild.icon} value={feild.value} onChange={feild.onChange} key={index} name={feild.name} placeholder={feild.placeholder}
                        type={feild.name === "password" && showPassword ? "text" : feild.name === "confirmPassword" && showConfirmPassword ? "text" : feild.name === "oldPassword" && showOldPassword ? "text" : feild.name === "newPassword" && showNewPassword ? "text" : feild.type }
                        togglePassword={() => togglePassword(feild.name)}
                    />
                    {error[feild.name] ? <p className={styles.errorMessage} >{errorMessages[feild.name].message}</p> : null}
                </div>
            ))
        }
        <button type="submit" className={styles.submitButton}>{buttonLabel}</button>
    </form>
  );
}
