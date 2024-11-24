import React from 'react'
import { useState, useEffect } from 'react';
import { getTask } from '../../services/tasks';
import Board from '../board';
import Analytics from '../analytics';
import Settings from '../settings';
import styles from './dashboard.module.css';
import Navbar from '../../components/navbar';


export default function Dashboard() {
  

  const [currentComponent, setCurrentComponent] = useState('board');

    const renderComponent = () => {
        switch (currentComponent) {
            case 'board':
                return <Board />;
            case 'analytics':
                return <Analytics />;
            case 'settings':
                return <Settings />;
            default:
                return <Board />;
        }
    };

    const handleNavigate = (component) => {
        setCurrentComponent(component);
    };

  return (
    <div className={styles.dashboard}>
        <Navbar onNavigate={handleNavigate} />
        <div className={styles.content}>
            {renderComponent()}
        </div>

    </div>
  );
}

