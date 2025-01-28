import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Typography, Layout, Menu, Button, Table, Space, message, Popconfirm } from 'antd';
import { UserOutlined, TeamOutlined, FileTextOutlined, BarChartOutlined, IdcardFilled, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext.tsx'; 
import api from '../services/api.ts';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Empresas: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchEmpresas(currentPage);
  }, [currentPage, isAuthenticated]);

  const fetchEmpresas = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await api.get(`/empresas?page=${page}&limit=${pageSize}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmpresas(response.data.data || []);
      setTotal(response.data.meta.total || 0);
    } catch (error) {
      message.error('Erro ao buscar empresas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/empresas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Empresa deletada com sucesso!');
      fetchEmpresas(currentPage);
    } catch (error) {
      message.error('Erro ao deletar empresa');
    }
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
  };

  const handleCadastrarEmpresa = () => {
    navigate('/empresas/cadastrar');
  };

  const columns = [
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'Nome Fantasia',
      dataIndex: 'nomeEmpresa',
      key: 'nomeEmpresa',
    },
    {
      title: 'Endereço',
      dataIndex: 'endereco',
      key: 'endereco',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/empresas/editar/${record.id}`)}>
            Editar
          </Button>
          <Popconfirm
            title="Tem certeza que deseja deletar?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" danger>
              Deletar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        backgroundColor: '#001529', 
        padding: '0 20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' // Garante que os elementos fiquem bem distribuídos
      }}>
        {/* Título à esquerda */}
        <Title level={3} style={{ color: 'white', margin: 0, flex: 1, textAlign: 'left' }}>
          Empresas
        </Title>

        {/* Logo centralizada */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src="/logo.svg" alt="Logo" style={{ width: '90px', height: '90px' }} />
        </div>

        {/* Espaço reservado para manter alinhamento correto */}
        <div style={{ flex: 1 }}></div>
      </Header>
      <Layout>
        <Menu
          mode="horizontal"
          style={{ textAlign: 'center', backgroundColor: '#f0f2f5', borderBottom: '1px solid #d9d9d9' }}
          defaultSelectedKeys={['empresas']}
        >
           <Menu.Item key="dashboard" icon={<IdcardFilled />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="empresas" icon={<IdcardFilled />}>
            <Link to="/empresas">Empresas</Link>
          </Menu.Item>
          <Menu.Item key="clientes" icon={<TeamOutlined />}>
            <Link to="/clientes">Clientes</Link>
          </Menu.Item>
          <Menu.Item key="usuarios" icon={<UserOutlined />}>
            <Link to="/usuarios">Usuários</Link>
          </Menu.Item>
          <Menu.Item key="anotacoes" icon={<FileTextOutlined />}>
            <Link to="/anotacoes">Anotações</Link>
          </Menu.Item>
          <Menu.Item key="relatorios" icon={<BarChartOutlined />}>
            <Link to="/relatorios">Relatórios</Link>
          </Menu.Item>
        </Menu>
        <Content style={{ padding: '20px' }}>
          <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Space style={{ justifyContent: 'space-between', width: '100%' }}>
              <Title level={4}>Lista de Empresas</Title>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleCadastrarEmpresa}>
                Cadastrar
              </Button>
            </Space>
            <Table
              columns={columns}
              dataSource={empresas.length ? empresas : []}
              rowKey="id"
              pagination={{
                current: currentPage,
                total,
                pageSize: 10,
                showSizeChanger: false,
              }}
              loading={loading}
              onChange={handleTableChange}
              style={{ marginTop: '20px' }}
            />
          </Card>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'white' }}>
        Empresas App ©2024 Criado por Hyuri
      </Footer>
    </Layout>
  );
};

export default Empresas;
