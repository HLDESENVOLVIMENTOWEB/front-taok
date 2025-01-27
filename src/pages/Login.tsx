import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, Typography } from 'antd';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null);

    try {
      await signIn(email, password);
      alert('Login realizado com sucesso!');
      navigate('/dashboard'); 
    } catch (err) {
      setError('Email ou senha inválidos. Tente novamente.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Login</Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </Form.Item>
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: '15px' }}
            />
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
