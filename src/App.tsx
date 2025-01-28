import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Usuarios from './pages/Usuarios.tsx';
import Empresas from './pages/Empresas.tsx';
import Clientes from './pages/Clientes.tsx';
import Anotacoes from './pages/Anotacoes.tsx';
import Relatorios from './pages/Relatorios.tsx';
import CadastrarUsuario from './pages/CadastrarUsuario.tsx';
import EditarUsuario from './pages/EditarUsuario.tsx'; 
import CadastrarEmpresa from './pages/CadastroEmpresas.tsx';
import EditarEmpresa from './pages/EditarEmpresas.tsx';
import CadastrarCliente from './pages/CadastrarCliente.tsx';
import EditarCliente from './pages/EditarCliente.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/cadastrar" element={<CadastrarUsuario />} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario />} /> 
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/empresas/cadastrar" element={<CadastrarEmpresa />} />
          <Route path="/empresas/editar/:id" element={<EditarEmpresa />} /> 
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/cadastrar" element={<CadastrarCliente />} />
          <Route path="/clientes/editar/:id" element={<EditarCliente />} /> 
          <Route path="/anotacoes" element={<Anotacoes />} />
          <Route path="/relatorios" element={<Relatorios />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
