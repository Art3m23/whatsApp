import React, { useState, useEffect } from 'react';
import styles from './style.module.css';


export default function MessageItem({ text, role, sendingTime }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    let hours = new Date(sendingTime).getHours();
    let minutes = new Date(sendingTime).getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    setTime(`${hours}:${minutes}`);
  }, [sendingTime])

  return (
    <div className={styles.messageLine}

      style={{
        justifyContent: role === 'sender' ? 'flex-end' : 'flex-start',
      }}

    >
      <div className={styles.messageItem}
        style={{
          backgroundColor: role === 'sender' ? '#1EBE71' : '#FFF',
          color: role === 'sender' ? '#fff' : 'black',
          borderBottomRightRadius: role === 'sender' ? '0' : '10px',
          borderBottomLeftRadius: role === 'sender' ? '10px' : '0px'
        }}
      >
        <div className={styles.messageText}>{text}</div>
        <div className={styles.messageDate} style={{ color: role === 'sender' ? '#fff' : '#888', }}>{time}</div>
      </div>
    </div>
  );
};