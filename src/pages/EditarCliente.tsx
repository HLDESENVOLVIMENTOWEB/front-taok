import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, Layout, Menu, message } from 'antd';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  IdcardFilled,
} from '@ant-design/icons';
import api from '../services/api.ts';
import { useAuth } from '../context/AuthContext.tsx';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const EditarCliente: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/clientes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        form.setFieldsValue(response.data);
      } catch (error) {
        message.error('Erro ao carregar os dados do cliente');
      }
    };

    fetchCliente();
  }, [id, token, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await api.put(`/clientes/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Cliente atualizado com sucesso!');
      navigate('/clientes');
    } catch (error) {
      message.error('Erro ao atualizar cliente');
    } finally {
      setLoading(false);
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
          Editar clientes
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
          defaultSelectedKeys={['clientes']}
        >
          <Menu.Item key="dashboard" icon={<IdcardFilled />}>
            <Link to="/dashboard">Dashboard</Link>
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
            <Title level={4} style={{ textAlign: 'center' }}>Editar Cliente</Title>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item
                label="Nome Completo"
                name="nomeCompleto"
                rules={[{ required: true, message: 'Por favor, insira o nome completo do cliente' }]}
              >
                <Input placeholder="Digite o nome completo" />
              </Form.Item>

              <Form.Item
                label="CPF"
                name="cpf"
                rules={[{ required: true, message: 'Por favor, insira o CPF' }]}
              >
                <Input placeholder="Digite o CPF" />
              </Form.Item>

              <Form.Item
                label="Data de Nascimento"
                name="dataNascimento"
                rules={[{ required: true, message: 'Por favor, insira a data de nascimento' }]}
              >
                <Input placeholder="Digite a data de nascimento (YYYY-MM-DD)" />
              </Form.Item>

              <Form.Item
                label="Nome da Mãe"
                name="nomeMae"
                rules={[{ required: true, message: 'Por favor, insira o nome da mãe' }]}
              >
                <Input placeholder="Digite o nome da mãe" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Por favor, insira o email' },
                  { type: 'email', message: 'Insira um email válido' },
                ]}
              >
                <Input placeholder="Digite o email" />
              </Form.Item>

              <Form.Item
                label="Telefone"
                name="telefone"
                rules={[{ required: true, message: 'Por favor, insira o telefone' }]}
              >
                <Input placeholder="Digite o telefone" />
              </Form.Item>

              <Form.Item
                label="CEP"
                name="cep"
                rules={[{ required: true, message: 'Por favor, insira o CEP' }]}
              >
                <Input placeholder="Digite o CEP" />
              </Form.Item>

              <Form.Item
                label="Observações"
                name="observacoes"
              >
                <Input.TextArea rows={4} placeholder="Digite observações sobre o cliente (opcional)" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  Salvar Alterações
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'white' }}>
        Clientes App ©2024 Criado por Hyuri
      </Footer>
    </Layout>
  );
};

export default EditarCliente;
