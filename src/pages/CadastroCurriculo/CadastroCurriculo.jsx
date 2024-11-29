import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setDados, getDados } from '../../components/local.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

const Curriculos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://picapauapi-production.up.railway.app/api/curriculos/')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Currículos</h1>
      <ul>
        {data.map((curriculo, index) => (
          <li key={index}>{curriculo.nome}</li>
        ))}
      </ul>
    </div>
  );
};

const CadastroCurriculo = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('cpf', cpf);
    formData.append('arquivo', arquivo);

    const dados = getDados();
    const token = dados?.token;

    axios.post('https://picapauapi-production.up.railway.app/api/curriculos/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` // Adiciona o token de autenticação aqui
      }
    })
      .then(response => {
        setMessage('Currículo cadastrado com sucesso!');
        setLoading(false);
        // Limpar os campos do formulário
        setNome('');
        setEmail('');
        setCpf('');
        setArquivo(null);
      })
      .catch(error => {
        setMessage('Erro ao cadastrar currículo.');
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Cadastro de Currículo</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>CPF:</label>
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        </div>
        <div>
          <label>Arquivo PDF:</label>
          <input type="file" accept="application/pdf" onChange={(e) => setArquivo(e.target.files[0])} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function funLogin(e) {
    e.preventDefault();
    if (email !== "" && senha !== "") {
      axios.post("https://picapauapi-production.up.railway.app/api/login", {
        email: email,
        senha: senha
      }).then((resp) => {
        console.log(resp.data);
        setDados({ token: resp.data.token }); // Armazena o token no localStorage
        if (resp.data.user.tipo === "Gerenciador") {
          navigate("/home");
        } else {
          navigate("/equipe");
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="src/assets/images/logo-picapau.png"
          alt="Logo Pica Pau Móveis"
          className="login-logo"
        />
      </div>
      <div className="login-right">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={funLogin}>
            <div className="login-input">
              <label className='cor-eti' htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Digite seu email" onChange={(e) => { setEmail(e.target.value) }} required />
            </div>
            <div className="login-input">
              <label className='cor-eti' htmlFor="password">Senha</label>
              <input type="password" id="password" placeholder="Digite sua senha" onChange={(e) => { setSenha(e.target.value) }} required />
            </div>
            <button type="submit" className="login-button">Entrar</button>
          </form>
          <p className="signup-text">
            Não tem uma conta? <Link to="/cadastro">Crie aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Curriculos, CadastroCurriculo, Login };