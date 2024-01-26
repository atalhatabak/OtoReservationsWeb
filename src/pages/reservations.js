import React, { useState, useEffect } from 'react';
import Header from './sabit/header';
import axios from 'axios';



  function Section() {

    const [reservations, setReservations] = useState([]);

    const fetchData = async () => { 
      try {
        const serializedData = localStorage.getItem("appData");
        if (serializedData === null) {
          console.log(`appData Bulunamadı`);
          window.location.href = '/login';
          return; // Bu noktada useEffect'i sonlandır
        }
    
        const storedData = JSON.parse(serializedData);
    
        const apiUrl = 'http://127.0.0.1:8000/api/getReservations';
        const requestData = {
          user_id: storedData.user_id, 
        };
    
        const headers = {
          'Authorization': `Bearer ${storedData.token}`,
        };
    
        const response = await axios.post(apiUrl, requestData, { headers });
        console.log('Başarılı İstek', response.data.message);
        setReservations(response.data.message);
    
      } catch (error) {
        console.error('Hata', error);
      }
    }
    useEffect(() => {
      fetchData();
  }, []);

  console.log(reservations);

  const iptal = async (id) => {

      const serializedData = localStorage.getItem("appData");
      if (serializedData === null) {
        console.log(`appData Bulunamadı`);
        window.location.href = '/login';
        return; 
      }
  
      const storedData = JSON.parse(serializedData);
  
      const apiUrl = 'http://127.0.0.1:8000/api/deleteReservation';
      const requestData = {
        id: id, 
      };
  
      const headers = {
        'Authorization': `Bearer ${storedData.token}`,
      };
  
      const response = await axios.post(apiUrl, requestData, { headers });
      console.log('Başarılı İstek', response.data.message);
      window.location.reload()
  }

    return (
      <section key="reservations">
        <article>
                  <a href="/newreservation"><div className="card" key="xxx">
                      <h3 className="card-title">Yeni Rezervasyon   </h3>
                      <p className="card-description">Oluştur</p>
                  </div></a>

              {reservations.map((item, index) => (
                  <div className="card" key={item.id}>
                      <h3 className="card-title">{item.date} - {item.session}  </h3>
                      <p className="card-description">{item.branch} - {item.city}</p>
                      <a href="#" className="card-button" onClick={() => iptal(item.id)} >İptal Et</a>
                  </div>
              ))}



        </article>
      </section>
    );
  }


  function Router() {
    
    return (

      <main>
        <Header />

        <Section />

 
      </main>
            
    );
  }

export default Router;
 
