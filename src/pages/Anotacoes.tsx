import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Typography, Layout, Menu, Button, Table, Space, message, Popconfirm } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  IdcardFilled,
  PlusOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext.tsx';
import api from '../services/api.ts';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Anotacoes: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const [anotacoes, setAnotacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchAnotacoes(currentPage);
  }, [currentPage, isAuthenticated]);

  const fetchAnotacoes = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await api.get(`/anotacoes?page=${page}&limit=${pageSize}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnotacoes(response.data.anotacoes || []);
      setTotal(response.data.pagination.total || 0);
    } catch (error) {
      message.error('Erro ao buscar anotações');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/anotacoes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Anotação deletada com sucesso!');
      fetchAnotacoes(currentPage);
    } catch (error) {
      message.error('Erro ao deletar anotação');
    }
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
  };

  const handleCadastrarAnotacao = () => {
    navigate('/anotacoes/cadastrar');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Cliente',
      dataIndex: ['cliente', 'nomeCompleto'],
      key: 'cliente',
    },
    {
      title: 'Empresa',
      dataIndex: ['empresa', 'razaoSocial'],
      key: 'empresa',
    },
    {
      title: 'Produto/Serviço',
      dataIndex: 'produtoServico',
      key: 'produtoServico',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
    },
    {
      title: 'Valor Total',
      dataIndex: 'valorTotal',
      key: 'valorTotal',
      render: (valor: number) => `R$ ${valor.toFixed(2)}`,
    },
    {
      title: 'Data de Vencimento',
      dataIndex: 'dataVencimento',
      key: 'dataVencimento',
      render: (data: string) => new Date(data).toLocaleDateString('pt-BR'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/anotacoes/editar/${record.id}`)}>
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
          Anotações
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
          defaultSelectedKeys={['anotacoes']}
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
              <Title level={4}>Lista de Anotações</Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCadastrarAnotacao}
              >
                Cadastrar
              </Button>
            </Space>
            <Table
              columns={columns}
              dataSource={anotacoes}
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
        Anotações App ©2024 Criado por Hyuri
      </Footer>
    </Layout>
  );
};

export default Anotacoes;
