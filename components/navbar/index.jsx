import React, { useState } from 'react';
import styles from './navbar.module.css';
import { IoSettingsOutline } from "react-icons/io5";
import { TbUserHexagon } from "react-icons/tb";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GoDatabase } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import BasicModal from '../../modals/basic';


const Navbar = ({ onNavigate }) => {

    const navigate = useNavigate();
    const [selected, setSelected] = useState("board");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = (component) => {
        setSelected(component);
        onNavigate(component);
    }
    const logOut =() =>{
        localStorage.removeItem("token");
        alert("Logged Out");
        navigate("/login");
    }
    const handleLogoutClick = () => {
        setIsModalOpen(true); // Show the modal when "Log Out" is clicked
    }
    const handleConfirmLogout = () => {
        logOut(); // Call logOut function
        setIsModalOpen(false); // Close the modal
    }
    const handleCancelLogout = () => {
        setIsModalOpen(false); // Close the modal
    }


    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <i >{<TbUserHexagon />}</i> 
                <span>Pro Manage</span>
            </div>
            <div className={styles.buttons}>
                <button  className={`${styles.button} ${selected === 'board' ? styles.active : ''}`}
                 onClick={() => handleButtonClick("board")}>
                    <i >{<MdOutlineSpaceDashboard />}</i> 
                    Board
                </button>
                <button className={`${styles.button} ${selected === 'analytics' ? styles.active : ''}`}
                 onClick={() => handleButtonClick("analytics")}>
                    <i >{<GoDatabase />}</i>
                    Analytics
                </button>
                <button className={`${styles.button} ${selected === 'settings' ? styles.active : ''}`} 
                 onClick={() => handleButtonClick("settings")}>
                    <i >{<IoSettingsOutline />}</i> 
                    Settings
                </button>
            </div>
            <div className={styles.logoutContainer}>
                <button className={styles.logout} onClick={handleLogoutClick} >
                    <i >{<IoLogOutOutline />}</i> 
                    Log Out
                </button>
            </div>
            <BasicModal isOpen={isModalOpen} 
                onRequestClose={handleCancelLogout} 
                onConfirm={handleConfirmLogout}  />
        </div>
    );
};


export default Navbar;