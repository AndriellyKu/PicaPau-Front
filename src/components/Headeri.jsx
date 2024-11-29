import React, { useState, useEffect } from 'react';
import {setDados, getDados} from "./local.jsx"
import './Headeri.css';
import picaPau from "../assets/images/logo-picapau.png"

const Headeri = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [display, setDisplay] = useState("block")
  const [user, setUser] = useState(getDados([]))
  useEffect(() => {
    console.log(user.user.tipo)
    if(user.user.tipo === "Lider"){
      setDisplay("none");
    }  
  }, [])
  

  return (
    <header className="headeri">
      <div className="lg-hd">
        <img
          src={picaPau}
          alt="Logo Pica Pau Móveis"
        />
      </div>

      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="/Recrutamento" className={`d-${display}`}>Recrutamentos</a>
        <a href="/equipes" className={`d-${display}`}>Equipes</a>
      </nav>
    </header>
  );
};

export default Headeri;
