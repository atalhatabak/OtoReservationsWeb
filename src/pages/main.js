import React, { useState } from 'react';
import Header from './sabit/header';



  
  // Section bileşeni
  function Section() {


    //if(appData.token == "0"){window.location.href = '/login'}

    const serializedData = localStorage.getItem("appData");
        if (serializedData === null) {
          console.log(`appData Bulunamadı`);
          window.location.href = '/login'
        }
    const data = JSON.parse(serializedData);

    return (
      <section>
        

          <h3>Hoşgeldiniz {data.name} </h3><br></br>
         

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
 
