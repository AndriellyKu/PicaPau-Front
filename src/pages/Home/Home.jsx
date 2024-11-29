import React from 'react';
import './Home.css';
import Headeri from '../../components/Headeri';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <Headeri />
      <div className="options-container">
        <div className="option-card">
          <h3>Inserir Currículo ao Banco de Dados</h3>
          <p>Adicione currículos diretamente ao nosso banco de dados para futuras oportunidades.</p>
          <Link to="/cadastroCurriculo">
            <button>Inserir Currículo</button>
          </Link>
        </div>
        <div className="option-card">
          <h3>Criar Recrutamento</h3>
          <p>Inicie um novo recrutamento e gerencie o processo seletivo da empresa.</p>
          <Link to="/recrutamento">
            <button>Lista de Recrutamentos</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
