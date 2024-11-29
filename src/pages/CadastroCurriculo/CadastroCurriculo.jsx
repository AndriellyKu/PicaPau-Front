import React, { useEffect, useState } from 'react';
import {setDados, getDados} from '../../components/'
import axios from 'axios';

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

    const token = localStorage.getItem('token');

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

export { Curriculos, CadastroCurriculo };