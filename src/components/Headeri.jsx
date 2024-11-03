import React, { useState } from 'react';
import './Headeri.css';

const Headeri = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="headeri">
      <div className="lg-hd">
        <img
          src="src/assets/images/logo-picapau.png"
          alt="Logo Pica Pau Móveis"
        />
      </div>

      {/* Botão de hambúrguer */}
      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Links de navegação com a classe 'open' dinâmica */}
      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="/recrutamentos">Recrutamentos</a>
        <a href="/equipes">Equipes</a>
      </nav>
    </header>
  );
};

export default Headeri;
