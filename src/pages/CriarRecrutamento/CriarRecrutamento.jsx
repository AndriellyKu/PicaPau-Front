import React from 'react';
import './CriarRecrutamento.css';
import Headeri from '../../components/Headeri';

const CriarRecrutamento = () => {
  return (
    <>
        <Headeri />
        <div className="recruitment-container">


        <div className="form-container">
            <h1>Informações do recrutamento</h1>
            <form>
            <div className="form-group">
                <label>Nome do recrutamento</label>
                <input type="text" placeholder="Nome do recrutamento" />
            </div>

            <div className="form-group">
                <label>Líder do recrutamento</label>
                <input type="text" placeholder="Líder do recrutamento" />
            </div>

            <div className="form-group">
                <label>Descrição</label>
                <textarea placeholder="Descrição" rows="4"></textarea>
            </div>

            <div className="date-group">
                <div className="form-group">
                <label>Início</label>
                <input type="date" />
                </div>
                <div className="form-group">
                <label>Término</label>
                <input type="date" />
                </div>
            </div>

            <button type="submit" className="submit-button">Criar</button>
            </form>
        </div>
        </div>    
    </>
  );
};

export default CriarRecrutamento;
