import './App.css';
import { useState } from 'react';
import { Header } from './components/header';
import { Login } from './components/login';
import { Phone } from './components/phone';
import { ChatBox } from './components/chat-box';

function App() {
  const [id, setId] = useState(localStorage.getItem('id')?localStorage.getItem('id'):'');
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phone')?localStorage.getItem('phone'):'');
  const [loginVisible, setLoginVisible] = useState(localStorage.getItem('login')?false:true);
  const [phoneVisible, setPhoneVisible] = useState(localStorage.getItem('phone')?false:true);
  return (
    <div className="App">
      <Header setLoginVisible={setLoginVisible} setToken={setToken} setId={setId} setPhoneNumber={setPhoneNumber} setPhoneVisible={setPhoneVisible}/>
      <section className='content'>
        {
          loginVisible ? <Login id={id} token={token} setToken={setToken} setId={setId}  setLoginVisible={setLoginVisible} />
            : phoneVisible ? <Phone phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} setPhoneVisible={setPhoneVisible} />
            : <ChatBox id={id} token={token} phoneNumber={phoneNumber} setPhoneVisible={setPhoneVisible} setPhoneNumber={setPhoneNumber}/> 
        }
      </section>
    </div>
  );
}

export default App;
