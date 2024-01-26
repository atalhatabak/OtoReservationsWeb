import React from 'react';

const menuData = [
    { title: "Anasayfa", link: "/" },
    { title: "Rezervasyonlarım", link: "/reservations" },
    { title: "Araçlarım", link: "/cars" },
  ];

  const logout = () => {
    localStorage.removeItem("appData");
    window.location.reload()
}


function Header() {
    return (
        <header>
            <div className="xen-nav">
                <div  className="xen-content">
                    <a  className="brand" data-item="OtoReservation" href="/">OtoReservation</a>
                    <div className="xen-links xen-nav-items">
                        {menuData.map((item, index) => (
                            <a key={item.title} href={item.link} data-item={item.title}>{item.title}</a>
                        ))}
                        <a href="#logout" data-item="Çıkış Yap" onClick={() => logout()} >Çıkış Yap</a>


                    </div>
                </div>
                <div className="dropdown" id="dropdown" >
                    <a href="/reservations" data-item="Rezervasyonlarım">Rezervasyonlarım</a>
                    <a href="/cars" data-item="Araçlarım">Araçlarım</a>
                </div>
            </div>

        </header>
    );
  } 

  export default Header;
