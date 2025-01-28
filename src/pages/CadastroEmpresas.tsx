import React from 'react';
import { Form, Input, Button, Card, Typography, Layout, Menu, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
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

const CadastrarEmpresa: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await api.post('/empresas', values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Empresa cadastrada com sucesso!');
      navigate('/empresas');
    } catch (error) {
      message.error('Erro ao cadastrar empresa');
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
          Cadastro de empresas
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
          <Menu.Item key="empresas" icon={<TeamOutlined />}>
            <Link to="/empresas">Empresas</Link>
          </Menu.Item>
        </Menu>
        <Content style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
          <Card style={{ maxWidth: 500, width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Title level={4} style={{ textAlign: 'center' }}>Cadastrar Empresa</Title>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="CNPJ"
                name="cnpj"
                rules={[{ required: true, message: 'Por favor, insira o CNPJ' }]}
              >
                <Input placeholder="Digite o CNPJ" />
              </Form.Item>

              <Form.Item
                label="Razão Social"
                name="razaoSocial"
                rules={[{ required: true, message: 'Por favor, insira a razão social' }]}
              >
                <Input placeholder="Digite a razão social" />
              </Form.Item>

              <Form.Item
                label="Nome Fantasia"
                name="nomeFantasia"
              >
                <Input placeholder="Digite o nome fantasia" />
              </Form.Item>

              <Form.Item
                label="CEP"
                name="cep"
                rules={[{ required: true, message: 'Por favor, insira o CEP' }]}
              >
                <Input placeholder="Digite o CEP" />
              </Form.Item>

              <Form.Item
                label="Endereço"
                name="endereco"
                rules={[{ required: true, message: 'Por favor, insira o endereço' }]}
              >
                <Input placeholder="Digite o endereço" />
              </Form.Item>

              <Form.Item
                label="Bairro"
                name="bairro"
                rules={[{ required: true, message: 'Por favor, insira o bairro' }]}
              >
                <Input placeholder="Digite o bairro" />
              </Form.Item>

              <Form.Item
                label="Cidade"
                name="cidade"
                rules={[{ required: true, message: 'Por favor, insira a cidade' }]}
              >
                <Input placeholder="Digite a cidade" />
              </Form.Item>

              <Form.Item
                label="Estado"
                name="estado"
                rules={[{ required: true, message: 'Por favor, insira o estado' }]}
              >
                <Input placeholder="Digite o estado" />
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
                label="Inscrição Estadual"
                name="inscricaoEstadual"
              >
                <Input placeholder="Digite a inscrição estadual" />
              </Form.Item>

              <Form.Item
                label="Inscrição Municipal"
                name="inscricaoMunicipal"
              >
                <Input placeholder="Digite a inscrição municipal" />
              </Form.Item>

              <Form.Item
                label="Responsável"
                name="responsavel"
                rules={[{ required: true, message: 'Por favor, insira o nome do responsável' }]}
              >
                <Input placeholder="Digite o nome do responsável" />
              </Form.Item>

              <Form.Item
                label="Observações"
                name="observacoes"
              >
                <Input.TextArea rows={4} placeholder="Digite observações sobre a empresa (opcional)" />
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
        Empresas App ©2024 Criado por Hyuri
      </Footer>
    </Layout>
  );
};

export default CadastrarEmpresa;
