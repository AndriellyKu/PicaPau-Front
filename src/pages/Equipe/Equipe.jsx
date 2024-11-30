import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headeri from '../../components/Headeri';
import './Equipe.css';

const Equipe = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [liderEmail, setLiderEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token'); 

        const response = await fetch('https://picapauapi-production.up.railway.app/api/listar-funcionarios', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar funcionários');
        }

        const data = await response.json();
        setEmployees(data.funcionarios || []);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        setLoading(false);
        setError('Erro ao carregar funcionários. Tente novamente mais tarde.');
      }
    };

    fetchEmployees();
  }, []);

  const handleSelectMember = (id) => {
    setSelectedMembers((prevState) =>
      prevState.includes(id)
        ? prevState.filter((memberId) => memberId !== id)
        : [...prevState, id]
    );
  };

  const handleCreateTeam = async () => {
    if (!teamName || selectedMembers.length === 0 || !liderEmail) {
      alert('Por favor, insira o nome da equipe, selecione pelo menos um membro e forneça o email do líder.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://picapauapi-production.up.railway.app/api/equipes/criar-equipe', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: teamName,
          membros: selectedMembers,
          liderEmail: liderEmail
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert('Equipe criada com sucesso!');
        setTeamName('');
        setSelectedMembers([]);
        setLiderEmail('');
      } else {
        const errorData = await response.json();
        alert('Erro ao criar equipe: ' + errorData.message);
      }
    } catch (error) {
      console.error('Erro ao criar equipe:', error);
      alert('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div>
      <Headeri />
      <div className="container mt-5">
        <h1 className="mb-4">Criar Equipe</h1>

        <div className="mb-4">
          <label htmlFor="teamName" className="form-label">Nome da Equipe</label>
          <input
            type="text"
            className="form-control"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>


        <div className="mb-4">
          <label htmlFor="liderEmail" className="form-label">Email do Líder</label>
          <input
            type="email"
            className="form-control"
            id="liderEmail"
            value={liderEmail}
            onChange={(e) => setLiderEmail(e.target.value)}
          />
        </div>


        {loading ? (
          <div>Carregando...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="list-group">
            {employees.map((employee) => (
              <div key={employee._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{employee.nome}</span>
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(employee._id)}
                  onChange={() => handleSelectMember(employee._id)}
                />
              </div>
            ))}
          </div>
        )}


        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-primary" onClick={handleCreateTeam}>
            Criar Equipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Equipe;
