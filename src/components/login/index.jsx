
import React  from 'react';
import styles from './style.module.css';


export const Login = ({id,token,setToken,setId,setLoginVisible}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginVisible(false);
    localStorage.setItem('login',false);
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
  }
  return (
    <section className={styles.login}>
      <h2>Login</h2>
        <form className={styles.login_form} onSubmit={handleSubmit}>
          <div className={styles.form_groop}>
            <input type="text" name="id" value = {id} onChange={(e)=>setId(e.target.value)} required/>
            <label htmlFor="id">Id Instance</label>
          </div>
          <div className={styles.form_groop}>
            <input type="text" name="token" value = {token} onChange={(e)=>setToken(e.target.value)} required/>
            <label htmlFor="token">Token</label>
          </div>
            <input type="submit" value="log in"/>
        </form>
    </section>
  );
}
