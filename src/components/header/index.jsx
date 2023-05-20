import React from 'react';
import styles from './style.module.css';


export const Header = ({ setLoginVisible, setToken, setId, setPhoneNumber, setPhoneVisible }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setLoginVisible(true);
    setPhoneVisible(true);
    setToken('');
    setId('');
    setPhoneNumber('');
    localStorage.clear();
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src='/images/whatsapp.svg' alt="logo" />
          <p>WhatsAppChat</p>
        </div>
        <button type='button' onClick={handleClick} className={styles.exitBtn}>Exit</button>
      </div>
    </header>
  );
}
