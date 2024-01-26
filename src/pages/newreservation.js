import React, { useState, useEffect } from 'react';
import Header from './sabit/header';
import axios from 'axios';
import Select from 'react-select';



  
  // Section bileşeni
  function Section() {

      // formdan seçilen veriler için
      const [bolge, setBolge] = useState("");
      const [sehir, setSehir] = useState("");
      const [bayi, setBayi] = useState("");
      const [bayiId, setBayiId] = useState("");
      // Veritabanından gelen veriler için
      const [regions, setRegions] = useState("");
      const [cities, setCities] = useState("");
      const [branches, setBranches] = useState("");

      //form için filtrelenmiş veriler
      const [Formregions, setFormRegions] = useState(['']);
      const [Formcities, setFormCities] = useState(['']);
      const [Formbranches, setFormBranches] = useState(['']);

      /////TARİH SAAT SEÇME
      const [month,setMonth] = useState("");
      const [day,setDay] = useState("");
      const [FormMonth, setFormMonth] = useState([]);
      const [FormDay, setFormDay] = useState([]);
      const [ServerDates, setServerDates] = useState("");

      const [time,setTime] = useState("");
      const [FormTime,setFormTime] = useState(['08.00','10.00','12.00','14.00','16.00'])
        /////////////////

      useEffect(() => { // API isteği tek defalık olmak üzere
        if (!regions) {
          fetchData();
        }
      }, [regions]);
    
      const fetchData = async () => { // API fonksiyonu
        const serializedData = localStorage.getItem("appData");
        if (serializedData === null) {
          console.log(`appData Bulunamadı`);
          window.location.href = '/login';
          return; // Bu noktada useEffect'i sonlandır
        }
        const storedData = JSON.parse(serializedData);

        axios.get(`http://127.0.0.1:8000/api/getBranchs`, {
          headers: {
            'Authorization': `Bearer ${storedData.token}`,
          }
        })
          .then(response => {
            setFormRegions(response.data.message[2]);
            setCities(response.data.message[1]);
            setBranches(response.data.message[0]);
            console.log("Sunucudan Gelen Bayi Verileri",response.data.message);


          })
          .catch(error => {
            console.error(error);
          });
      };
    
      const filterCity =  () => {
        const tempcity = cities.filter(item => item.region == "Akdeniz");
        const tempcities=[];
        tempcity.forEach(item => {
          tempcities.push(item.city);
        });
        setFormCities(tempcities);

      }
      
      const filterBranch =  (itemx) => {
        console.log(`Seçilen Şehir: ${itemx.value}`);
        const tempbranch = branches.filter(item => item.city == itemx.value);
        const tempbranches=[];
        tempbranch.forEach(item => {
          tempbranches.push(item.branch);
        })
        setFormBranches(tempbranches);
      }

      const getDates = async () => {
        const serializedData = localStorage.getItem("appData");
        if (serializedData === null) {
          console.log(`appData Bulunamadı`);
          window.location.href = '/login';
          return; // Bu noktada useEffect'i sonlandır
        }
        const storedData = JSON.parse(serializedData);

        axios.get(`http://127.0.0.1:8000/api/getAvaibleDates`, {
          headers: {
            'Authorization': `Bearer ${storedData.token}`,
          },
          params:{
            'branch' : "test",
          },
        })
          .then(response => {
            setServerDates(response.data.message); // Sunucudan gelen veri 
            setFormMonth(Object.keys(response.data.message)); // sunucudan gelen verinin sadece Key'leri yani ay değerleri
            console.log("Sunucudan Gelen Tarih Saat Verileri",response.data.message);

          })
          .catch(error => {
            console.error(error);
          });
      }

      const changeFormDay =  (x) => {
         setFormDay(x);
      }

      const mainX =  async () => {
        branches.forEach(item =>{
          if(item.branch == bayi.value){
           console.log("Seçilen Bayi Id'si: "+item.id);
           setBayiId(item.id);
          }
        })  
        console.log(bayi.value);
        console.log(month.value);
        console.log(day.value);
        console.log(time.value);
        const serializedData = localStorage.getItem("appData");
        if (serializedData === null) {
          console.log(`appData Bulunamadı`);
          window.location.href = '/login';
          return; // Bu noktada useEffect'i sonlandır
        }
        const storedData = JSON.parse(serializedData);
        try {
          const response = await axios.post(`http://127.0.0.1:8000/api/addReservations`,
            {
              'date' : `${month.value}- ${day.value}-2024`,
              'session' : time.value,
              'user_id' : parseInt(storedData.user_id),
              'branch_id' : bayiId,
              'car_id' : "1",
            },
            {
              headers: {
                'Authorization': `Bearer ${storedData.token}`,
              },
            }
          );
            console.log("Rezervasyon Başarı İle Yapıldı");
            window.location.href = '/reservations';
        } catch (error) {
          console.log('API isteği başarısız:', error);
        }
      }

      return (

      <section>
        <article>

          <Select
          options={Formregions.map((region) => ({ value: region, label: region }))}
          value={bolge}
          onChange={(selectedItem) => {
            setBolge(selectedItem);
            filterCity(selectedItem);
          }}
          placeholder="Bölge Seçiniz"
        />

        <Select
          options={Formcities.map((city) => ({ value: city, label: city }))}
          value={sehir}
          onChange={(selectedItem) => {
            filterBranch(selectedItem);
            setSehir(selectedItem);
          }}
          placeholder="Şehir Seçiniz"
        />

        <Select
          options={Formbranches.map((branch) => ({ value: branch, label: branch }))}
          value={bayi}
          onChange={(selectedItem) => {
            setBayi(selectedItem)
            console.log(`Seçilen Bayi: ${selectedItem.value}`);
            getDates();
          }}
          placeholder="Bayi Seçiniz"
        />

        <Select
          options={FormMonth.map((month) => ({ value: month, label: month }))}
          value={month}
          onChange={(selectedItem) => {
            setMonth(selectedItem);
            changeFormDay(ServerDates[selectedItem.value]);
            console.log(`Seçilen Ay: ${selectedItem.value}`);

          }}
          placeholder="Ay Seçiniz"
        />
        <Select
          options={FormDay.map((day) => ({ value: day, label: day }))}
          value={day}
          onChange={(selectedItem) => {
            setDay(selectedItem);
            console.log(`Seçilen Gün: ${selectedItem.value}`);
          }}
          placeholder="Gün Seçiniz"
        />
        <Select
          options={FormTime.map((time) => ({ value: time, label: time }))}
          value={time}
          onChange={(selectedItem) => {
            setTime(selectedItem);
            console.log(`Seçilen Saat: ${selectedItem.value}`);

          }}
          placeholder="Saat Seçiniz"
        />
        <a href="#"><div className='submitButton' onClick={mainX}> Rezervasyon Yap</div></a>
        
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
 
