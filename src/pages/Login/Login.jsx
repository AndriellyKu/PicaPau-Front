import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="src\assets\images\logo-picapau.png" 
          alt="Logo Pica Pau Móveis"
          className="login-logo"
        />
      </div>
      <div className="login-right">
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="login-input">
              <label className='cor-eti' htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Digite seu email" required />
            </div>
            <div className="login-input">
              <label className='cor-eti' htmlFor="password">Senha</label>
              <input type="password" id="password" placeholder="Digite sua senha" required />
            </div>
            <button type="submit" className="login-button">Entrar</button>
          </form>
          <p className="signup-text">
            Não tem uma conta? <Link to="/cadastro">Crie aqui</Link> {/* Usando Link para evitar recarregamento */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
