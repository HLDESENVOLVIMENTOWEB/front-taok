import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, Layout, Menu, Select, message } from 'antd';
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
const { Option } = Select;

const EditarUsuario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get(`/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        form.setFieldsValue(response.data);
      } catch (error) {
        message.error('Erro ao carregar dados do usuário');
      }
    };

    fetchUsuario();
  }, [id, token, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await api.put(`/usuarios/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Usuário atualizado com sucesso!');
      navigate('/usuarios');
    } catch (error) {
      message.error('Erro ao atualizar usuário');
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
          Editar usuários
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
          defaultSelectedKeys={['usuarios']}
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
            <Title level={4} style={{ textAlign: 'center' }}>Editar Usuário</Title>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item
                label="Nome do Usuário"
                name="nomeUsuario"
                rules={[{ required: true, message: 'Por favor, insira o nome do usuário' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Por favor, insira o email' },
                  { type: 'email', message: 'Insira um email válido' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="senha"
              >
                <Input.Password placeholder="Deixe em branco para manter a senha atual" />
              </Form.Item>

              <Form.Item
                label="Função"
                name="role"
                rules={[{ required: true, message: 'Por favor, selecione a função' }]}
              >
                <Select>
                  <Option value="User">Usuário</Option>
                  <Option value="Admin">Administrador</Option>
                </Select>
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
        Usuários App ©2024 Criado por Hyuri
      </Footer>
    </Layout>
  );
};

export default EditarUsuario;
