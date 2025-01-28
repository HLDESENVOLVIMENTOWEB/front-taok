import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Layout, Menu } from 'antd';
import { UserOutlined, TeamOutlined, FileTextOutlined, BarChartOutlined, IdcardFilled } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
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
          Dashboard
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
          defaultSelectedKeys={['dashboard']}
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
          <Card style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Title level={4}>Bem-vindo ao Dashboard</Title>
            <Text>Selecione uma opção no menu acima para navegar.</Text>
          </Card>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'white' }}>
        Dashboard App ©2024 Criado por Hyuri
      </Footer>
    </Layout>
  );
};

export default Dashboard;
