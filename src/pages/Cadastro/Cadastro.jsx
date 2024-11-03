import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-left">
        <img
          src="src/assets/images/logo-picapau.png"
          alt="Logo Pica Pau Móveis"
          className="cadastro-logo"
        />
      </div>
      <div className="cadastro-right">
        <div className="cadastro-box">
          <h2>Cadastro</h2>
          <form>
            <div className="cadastro-input">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Digite seu email" required />
            </div>
            <div className="cadastro-input">
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" placeholder="Digite sua senha" required />
            </div>
            <p className="role-text">Você é administrador ou Líder</p>
            <div className="role-selection">
              <button
                type="button"
                className={`role-button ${selectedRole === 'admin' ? 'active' : ''}`}
                onClick={() => handleRoleSelection('admin')}
              >
                Admin
              </button>
              <button
                type="button"
                className={`role-button ${selectedRole === 'lider' ? 'active' : ''}`}
                onClick={() => handleRoleSelection('lider')}
              >
                Líder
              </button>
            </div>
            <button type="submit" className="cadastro-button">Cadastrar</button>
          </form>
          <p className="login-text">
            Já tem uma conta? <Link to="/">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
