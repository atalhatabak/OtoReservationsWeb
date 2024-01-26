import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './contexts/AuthContext';


  // Section bileşeni
  function Section() {
    const { appData, login, logout } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const mainX = async () => {
        try {
            const apiUrl = 'http://127.0.0.1:8000/api/login';
            const data = {
              email: email,
              password: password,
            };
            const response = await axios.post(apiUrl, data);
            console.log('Başarılı İstek', response.data);
            const serializedData = JSON.stringify(response.data);
                  localStorage.setItem("appData", serializedData);
                  console.log(`Veri appData olarak çerezlere eklendi `);

            window.location.reload()

          } catch (error) {
            // İstek başarısızsa burada hata işlemleri yapılabilir
            console.error('Hata', error);
          }
    };

    
        const serializedData = localStorage.getItem("appData");
        if (serializedData === null) {
          console.log(`appData Bulunamadı`);
        }
        else{
            const data = JSON.parse(serializedData);
            window.location.href = '/'
        }
        


    return (
      <section>
            <article>
            <div class="loginpage">
                <input
                    type="text"
                    placeholder="E Posta"
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
                    type="submit"
                    value="Giriş Yap"
                    onClick={mainX}
                />

            <br></br><br></br><br></br><center><a href="/register" class="yonlendirme"  onClick={() => window.location.href = '/register'}>Hesabın Yok mu? Kayıt Ol</a></center>
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
        <footer>
          <h4>Footer</h4>
        </footer>
      </div>
    );
  }

export default Router;
 
