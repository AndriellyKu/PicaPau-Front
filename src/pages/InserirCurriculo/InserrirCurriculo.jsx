import React, { useState } from 'react';
import axios from 'axios';
import { getDados } from '../../components/local.jsx';

export const http = axios.create({
  baseURL: 'https://picapauapi-production.up.railway.app/api',
  headers: {'User-Agent': 'AluroniAdmin'}
});

const InserirCurriculo = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [arquivo, setArquivo] = useState(null);

  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dados = getDados();
    const token = dados?.token;

    if (nome !== "" && email !== "" && cpf !== "" && arquivo !== null) {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('email', email);
      formData.append('cpf', cpf);
      formData.append('arquivo', arquivo);

      http.post('/curriculos', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response.data);
        // Adicione aqui qualquer ação adicional após o envio bem-sucedido
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <div>
      <h1>Inserir Currículo</h1>
      <p>Adicione seu currículo ao banco de dados.</p>
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
          <label>Arquivo:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default InserirCurriculo;