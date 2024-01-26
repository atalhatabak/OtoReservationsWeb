import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './contexts/AuthContext';


  // Section bileşeni
  function Section() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [TC, setTC] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('0');

    const mainX = async () => {
        try {
            const apiUrl = 'http://127.0.0.1:8000/api/register';
            const data = {
                name:name,
                email: email,
                password: password,
                TC:TC,
                phone:phone,
                role:role,        
            };
            const response = await axios.post(apiUrl, data);
            console.log('Başarılı İstek', response.data);
            window.location.href = '/login'

          } catch (error) {
            // İstek başarısızsa burada hata işlemleri yapılabilir
            console.error('Hata', error);
          }
    };




    return (
      <section>
            <article>
            <div class="loginpage">
                <input
                    type="text"
                    placeholder="İsim Soyisim"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="E posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="TC"
                    value={TC}
                    onChange={(e) => setTC(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Telefon"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    type="submit"
                    value="Kayıt Ol"
                    onClick={mainX}
                />

            <br></br><br></br><br></br><center><a href="/login" class="yonlendirme"  onClick={() => window.location.href = '/login'}>Hesabın Var mı? Giriş Yap</a></center>
            </div>

            </article>
      </section>
    );
  }


  function Router() {
    
    return (

      <div>
        <main>
          <Section />
        </main>

      </div>
    );
  }

export default Router;
 
