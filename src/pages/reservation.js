import React, { useState } from 'react';
import Header from './sabit/header';
import jsonproducts from './DB/products.json'
import { json, useParams } from 'react-router-dom';



  
  // Section bileşeni
  function Section() {
    const { id } = useParams();
    const productt = jsonproducts.filter((urun) => urun.id ===id);
    const product=productt[0];
    return (

      <section>
        <article>

            <div className="productimage">
              <img src={`${process.env.PUBLIC_URL}/images/${product.id}.jpg`}></img>
            </div>

            <div className="productdescr">
              <h1 id="productbaslik">{product.marka} - {product.model}</h1>
              <a id="productfiyat">Fiyat: {product.fiyat}</a>
              <p id="productfiyat">{product.aciklama}</p>
            </div>

        
        </article>
      </section>

    );
  }


  function Router() {
    
    return (

      <main>
        <Header />

        <Section />

        <footer>
              <h4>Footer</h4>
        </footer>
      </main>
            
    );
  }

export default Router;
 
