import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Headeri.css';

function Headeri () {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tipo, setTipo] = useState(null); // Estado para armazenar o tipo do usuário
  const navigate = useNavigate();

  useEffect(() => {
    // Simulação de obter o tipo do usuário (substitua por sua lógica real)
    const userType = localStorage.getItem('tipo'); // ou obtenha do Contexto/Redux
    setTipo(userType);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    if (tipo === 'Lider') {
      navigate('/Equipe');
    } else {
      navigate('/Home');
    }
  };


  return (
    <header className="headeri">
      <div className="lg-hd" onClick={goToHome} style={{ cursor: 'pointer' }}>
        <img
          src="/src/assets/images/logo-picapau.png"
          alt="Logo Pica Pau Móveis"
        />
      </div>

      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Links de navegação */}
        {tipo != 'Lider' && (
    <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
      <a href="/recrutamentos">Recrutamentos</a>
      <a href="/equipes">Equipes</a>
    </nav>
  )}

    </header>
  );
};

export default Headeri;
