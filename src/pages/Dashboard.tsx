import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
      }}>
        <Link to="/clientes" style={{ color: 'white', textDecoration: 'none' }}>Clientes</Link>
        <Link to="/usuarios" style={{ color: 'white', textDecoration: 'none' }}>Usuários</Link>
        <Link to="/anotacoes" style={{ color: 'white', textDecoration: 'none' }}>Anotações</Link>
        <Link to="/relatorios" style={{ color: 'white', textDecoration: 'none' }}>Relatórios</Link>
      </nav>
      <div style={{ padding: '20px' }}>
        <h1>Bem-vindo ao Dashboard</h1>
        <p>Selecione uma opção no menu acima.</p>
      </div>
    </div>
  );
};

export default Dashboard;
