import React from 'react';
import './Recrutamento.css';
import Headeri from '../../components/Headeri';

const Recrutamento = () => {
  const recrutamentos = [];

  return (
    <div>
      <Headeri />
      
      <div className="recrutamentos-container">
        <h1 className="title">Recrutamentos</h1>

        <div className="recrutamentos-list">
          {recrutamentos.length > 0 ? (
            recrutamentos.map((recrutamento) => (
              <div key={recrutamento.id} className="recrutamento-item">
                <span>{recrutamento.titulo}</span>
                <span className="termino">Término em {recrutamento.termino}</span>
              </div>
            ))
          ) : (
            <div className="recrutamento-item">
              Nenhum recrutamento disponível no momento.
            </div>
          )}
        </div>

        <button className="create-button" onClick={() => alert("Criar novo recrutamento")}>
          Criar
        </button>
      </div>
    </div>
  );
};

export default Recrutamento;
