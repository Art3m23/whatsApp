import React  from 'react';
import styles from './style.module.css';


export const Phone = ({phoneNumber, setPhoneNumber,setPhoneVisible}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setPhoneVisible(false);
    localStorage.setItem('phone',phoneNumber);
  }

  return (
    <section className={styles.phone}>
      <h2>Сreating a сhat</h2>
        <form className={styles.phone_form} onSubmit={handleSubmit}>
          <div className={styles.form_groop}>
            <input type="text" name="phoneNumber" value = {phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} required/>
            <label htmlFor="phoneNumber">Phone Number</label>
          </div>
            <input type="submit" value="create"/>
        </form>
    </section>
  );
}