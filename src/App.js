import logo from './logo.svg';
import './App.css';
import './Libs/style.css';
import './Libs/menu.css';
import './Libs/navbar.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';


import Login from './login';
import Register from './register';
import Main from './pages/main';
import Reservations from './pages/reservations';
import Cars from './pages/cars';
import Reservation from './pages/reservation';
import NewReservation from './pages/newreservation';


function App() {

  return (

<AuthProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} index />
      <Route path="/register" element={<Register />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/reservation/:id" element={<Reservation />} />
      <Route path="/newreservation" element={<NewReservation />} />
      <Route path="*" element={<Main />} />
    </Routes>
  </BrowserRouter>
</AuthProvider>


  );
}

export default App;
