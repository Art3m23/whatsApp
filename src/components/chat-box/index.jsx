import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { getContactInfo } from '../../services/chat.service';
import MessageItem from '../message-item';
import { sendMessage } from '../../services/chat.service';
import { deleteNotification } from '../../services/chat.service';
import { receiveNotification } from '../../services/chat.service';



export const ChatBox = ({ id, token, phoneNumber, setPhoneVisible,setPhoneNumber}) => {
  const [listMessage, setListMessage] = useState(JSON.parse(localStorage.getItem('listMessage')) ? JSON.parse(localStorage.getItem('listMessage')) : []);
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('role')) ? JSON.parse(localStorage.getItem('role')) : []);
  const [text, setText] = useState('');
  const [contactInfo, setContactInfo] = useState({});
  const [sendingTime, setSendingTime] = useState(JSON.parse(localStorage.getItem('sendingTime')) ? JSON.parse(localStorage.getItem('sendingTime')) : []);
  useEffect(() => {
    getContactInfo(id, token, `${phoneNumber}@c.us`).then((responce) => {
      setContactInfo(responce);
    }, error => {
      setContactInfo(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      );
    });
  }, [id, token,phoneNumber]);


  const handleClick = () => {
    setPhoneVisible(true);
    setPhoneNumber('');
    localStorage.removeItem('phone');
  }



  useEffect(() => {
    setTimeout(() => {
      receiveNotification(id, token).then((responce) => {
        if (responce) {
          if (responce.body.typeWebhook === 'outgoingMessageReceived') {
            setRole([...JSON.parse(localStorage.getItem('role')) ? JSON.parse(localStorage.getItem('role')) : role, 'recipient']);
            setListMessage([...JSON.parse(localStorage.getItem('listMessage')) ? JSON.parse(localStorage.getItem('listMessage')) : listMessage, responce.body.messageData.extendedTextMessageData.text]);
            setSendingTime([...JSON.parse(localStorage.getItem('sendingTime')) ? JSON.parse(localStorage.getItem('sendingTime')) : sendingTime, (new Date(responce.body.timestamp * 1000))]);
            localStorage.setItem('listMessage', JSON.stringify(JSON.parse(localStorage.getItem('listMessage'))));
            localStorage.setItem('role', JSON.stringify(JSON.parse(localStorage.getItem('role'))));
            localStorage.setItem('sendingTime', JSON.stringify(JSON.parse(localStorage.getItem('sendingTime'))));
            deleteNotification(id, token, responce.receiptId);
          }
        }
      }, error => {
        console.log(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        );
      });
    }, 5000)
  });
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  }

  const handleSendClick = () => {
    if (text) {
      sendMessage(id, token, `${phoneNumber}@c.us`, text).then((response) => {
        if (response.idMessage) {
          setRole([...role, 'sender']);
          setListMessage([...listMessage, text]);
          setSendingTime([...sendingTime, new Date()]);
          localStorage.setItem('listMessage', JSON.stringify([...listMessage, text]));
          localStorage.setItem('role', JSON.stringify([...role, 'sender']));
          localStorage.setItem('sendingTime', JSON.stringify([...sendingTime, new Date()]));
        }
      }, error => {
        console.log(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        );
      });
      setText('');
    }
  };

  return (
    <section className={styles.chat}>
      <div className={styles.chat_header}>
        <div className={styles.chat_headerinfo}>
          <button type='button' onClick={handleClick} className={styles.backBtn}/>
          <img className={styles.chat_avatar} src={contactInfo.avatar ? contactInfo.avatar : '/images/unnamed.png'} alt="" />
          <div className={styles.chat_name}>{contactInfo.name}</div>
          <p>{contactInfo.lastSeen}</p>
        </div>
      </div>
      <div className={styles.chat_body}>
        {listMessage.length !== 0 && listMessage.map((item, i) => (
          <MessageItem key={i} text={item} role={role[i]} sendingTime={sendingTime[i]} />
        ))}
      </div>
      <div className={styles.chat_footer}>
        <div className={styles.chat_inputArea}>
          <input className={styles.chat_input} placeholder="Enter your message.." type="text" value={text} onChange={handleChange} />
        </div>
        <div className={styles.chat_pos}>
          <button type='button' className={`${styles.chat_btn} ${styles.btn_send}`} onClick={handleSendClick} />
        </div>
      </div>
    </section>
  );
}