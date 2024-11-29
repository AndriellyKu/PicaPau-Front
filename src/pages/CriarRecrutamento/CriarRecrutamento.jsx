import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CriarRecrutamento.css';
import Headeri from '../../components/Headeri';
import {setDados, getDados} from "../../components/local.jsx"
import axios from 'axios';

function CriarRecrutamento (){

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [curriculos, setCurriculos] = useState(["67476832893fb118482365cf"]); 

  let user = getDados()

  function funCriarRecrutamento(e){
    e.preventDefault();
    console.log("Nome: " + nome)
    console.log("Descricao: " + descricao)


    const url = axios.create({
      baseURL: "https://picapauapi-production.up.railway.app/api",
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    });
    url.post("recrutamentos", {
      nome:nome,
      descricao:descricao,
      curriculos:curriculos
    }).then((resp) => {
      console.log(resp.data);
      setNome("");
      setDescricao("");
    }).catch((error) => {
      console.log(error);
    })
  }

  //

  const [listaCurriculos, setListaCurriculos] = useState([]);

  useEffect(() => {
    const httpCurriculos = axios.create({
      baseURL: "https://picapauapi-production.up.railway.app/api",
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    })
    
    httpCurriculos.get("curriculos/meus-curriculos")
      .then((response) => {
        setListaCurriculos(response.data);
        console.log(response.data.curriculos);
        setListaCurriculos(response.data.curriculos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Headeri />
      <div className="recruitment-page">
        <div className="container mt-4">
          <h1 className="recruitment-title">Criar Novo Recrutamento</h1>

          <div className="form-container">
            <form onSubmit={funCriarRecrutamento}>
              <div className="form-group">
                <label>Nome do Recrutamento</label>
                <input
                  type="text"
                  name="nome"
                  value={nome}
                  onChange={(e) => {setNome(e.target.value)}}
                  placeholder="Nome do Recrutamento"
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="descricao"
                  value={descricao}
                  onChange={(e) => {setDescricao(e.target.value)}}
                  placeholder="Descrição"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <h3>Selecione os Curriculos</h3>
                {
                  listaCurriculos.map((cur) => {

                    return(
                      <div>
                        <p>{cur.name}</p>
                      </div>
                    );
                  })
                }
              </div>
              <div>
                <button type="submit" className="btn btn-primary">Criar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CriarRecrutamento;