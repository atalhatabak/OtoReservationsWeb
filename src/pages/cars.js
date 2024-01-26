import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './sabit/header';


  // Section bileşeni
  function Section() {
    const [cars, setCars] = useState([]);

    const fetchData = async () => { 
      try {
        const serializedData = localStorage.getItem("appData");
        if (serializedData === null) {
          console.log(`appData Bulunamadı`);
          window.location.href = '/login';
          return; // Bu noktada useEffect'i sonlandır
        }
    
        const storedData = JSON.parse(serializedData);
    
        const apiUrl = 'http://127.0.0.1:8000/api/getCars';
        const requestData = {
          user_id: storedData.user_id, // Eğer email bilgisi de localStorage'da varsa
        };
    
        const headers = {
          'Authorization': `Bearer ${storedData.token}`,
        };
    
        const response = await axios.post(apiUrl, requestData, { headers });
        console.log('Başarılı İstek', response.data.message);
        setCars(response.data.message);
    
      } catch (error) {
        // İstek başarısızsa burada hata işlemleri yapılabilir
        console.error('Hata', error);
      }
    }
    useEffect(() => {
      fetchData();
  }, []);

  console.log(cars);

    return (
      <section key="reservations">
      <article>
            {cars.map((item, index) => (
            
                <div className="card" key={item.id}>
                    <h3 className="card-title">{item.brand}   </h3>
                    <p className="card-description">{item.model} </p>
                </div>

            ))}



      </article>
    </section>
    );
  }


  function Router() {
    
    return (
      <div>
      <Header />
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
 
