import React from 'react';
import { Form, Input, Button, Card, Typography, Layout, Menu, Select, DatePicker, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  IdcardFilled,
  PlusOutlined,
} from '@ant-design/icons';
import api from '../services/api.ts';
import { useAuth } from '../context/AuthContext.tsx';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

const CadastrarAnotacao: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const dataToSend = {
        ...values,
        dataVencimento: values.dataVencimento.format('YYYY-MM-DD'),
      };
      await api.post('/anotacoes', dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Anotação cadastrada com sucesso!');
      navigate('/anotacoes');
    } catch (error) {
      message.error('Erro ao cadastrar anotação');
    }
  };

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
          Cadastro de anotações
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
        <Content style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
          <Card style={{ maxWidth: 500, width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Title level={4} style={{ textAlign: 'center' }}>Cadastrar Anotação</Title>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Cliente ID"
                name="clienteId"
                rules={[{ required: true, message: 'Por favor, selecione o cliente' }]}
              >
                <Input placeholder="Digite o ID do cliente" />
              </Form.Item>

              <Form.Item
                label="Empresa ID"
                name="empresaId"
                rules={[{ required: true, message: 'Por favor, selecione a empresa' }]}
              >
                <Input placeholder="Digite o ID da empresa" />
              </Form.Item>

              <Form.Item
                label="Produto/Serviço"
                name="produtoServico"
                rules={[{ required: true, message: 'Por favor, insira o produto ou serviço' }]}
              >
                <Input placeholder="Digite o nome do produto ou serviço" />
              </Form.Item>

              <Form.Item
                label="Quantidade"
                name="quantidade"
                rules={[{ required: true, message: 'Por favor, insira a quantidade' }]}
              >
                <Input type="number" placeholder="Digite a quantidade" />
              </Form.Item>

              <Form.Item
                label="Valor Total"
                name="valorTotal"
                rules={[{ required: true, message: 'Por favor, insira o valor total' }]}
              >
                <Input type="number" placeholder="Digite o valor total" />
              </Form.Item>

              <Form.Item
                label="Data de Vencimento"
                name="dataVencimento"
                rules={[{ required: true, message: 'Por favor, selecione a data de vencimento' }]}
              >
                <DatePicker style={{ width: '100%' }} placeholder="Selecione a data de vencimento" />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Por favor, selecione o status' }]}
              >
                <Select placeholder="Selecione o status">
                  <Option value="Pendente">Pendente</Option>
                  <Option value="Pago">Pago</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Cadastrar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'white' }}>
        Anotações App ©2024 Criado por Hyuri
      </Footer>
    </Layout>
  );
};

export default CadastrarAnotacao;
