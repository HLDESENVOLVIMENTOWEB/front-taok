import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Card,
  Typography,
  Table,
  Space,
  Button,
  Select,
  DatePicker,
  message,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  IdcardFilled,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import api from "../services/api.ts";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Relatorios: React.FC = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [tipo, setTipo] = useState<string | null>(null);
  const [dataRange, setDataRange] = useState<any>(null);

  useEffect(() => {
    fetchRelatorios();
  }, [currentPage]);



  const fetchRelatorios = async () => {
    if (!tipo) return;
    setLoading(true);
    try {
      const params: any = { tipo, page: currentPage, limit: 10 };
      if (dataRange) {
        params.dataInicio = dataRange[0].format("YYYY-MM-DD");
        params.dataFim = dataRange[1].format("YYYY-MM-DD");
      }
      const response = await api.get("/relatorios", { params });
      setRelatorios(response.data.data || []);
      setTotal(response.data.meta.total || 0);
    } catch (error) {
      message.error("Erro ao buscar relatórios");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
  };

  const handleGenerateReport = async () => {
    if (!tipo) {
      message.warning("Selecione um tipo para gerar o relatório.");
      return;
    }
    try {
      const params: any = { tipo };
      if (dataRange) {
        params.dataInicio = dataRange[0].format("YYYY-MM-DD");
        params.dataFim = dataRange[1].format("YYYY-MM-DD");
      }
      const response = await api.get("/relatorios/pdf", {
        params,
        responseType: "blob", // Baixar como arquivo
      });

      // Criar link para download do PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `relatorio_${tipo}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      message.error("Erro ao gerar relatório");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nome", dataIndex: tipo === "clientes" ? "cliente.nomeCompleto" : "empresa.razaoSocial", key: "nome" },
    { title: "Produto/Serviço", dataIndex: "produtoServico", key: "produtoServico" },
    { title: "Quantidade", dataIndex: "quantidade", key: "quantidade" },
    { 
      title: "Valor Total", 
      dataIndex: "valorTotal", 
      key: "valorTotal", 
      render: (value: string | number) => {
        const numericValue = typeof value === "string" ? parseFloat(value) : value;
        return `R$ ${numericValue.toFixed(2)}`;
      }
    },
    { 
      title: "Data de Vencimento", 
      dataIndex: "dataVencimento", 
      key: "dataVencimento", 
      render: (value: string) => new Date(value).toLocaleDateString()
    },
  ];
  

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ 
        backgroundColor: '#001529', 
        padding: '0 20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' // Garante que os elementos fiquem bem distribuídos
      }}>
        {/* Título à esquerda */}
        <Title level={3} style={{ color: 'white', margin: 0, flex: 1, textAlign: 'left' }}>
          Relatórios
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
          style={{ textAlign: "center", backgroundColor: "#f0f2f5", borderBottom: "1px solid #d9d9d9" }}
          defaultSelectedKeys={["relatorios"]}
        >
          <Menu.Item key="dashboard" icon={<IdcardFilled />}><Link to="/dashboard">Dashboard</Link></Menu.Item>
          <Menu.Item key="empresas" icon={<IdcardFilled />}><Link to="/empresas">Empresas</Link></Menu.Item>
          <Menu.Item key="clientes" icon={<TeamOutlined />}><Link to="/clientes">Clientes</Link></Menu.Item>
          <Menu.Item key="usuarios" icon={<UserOutlined />}><Link to="/usuarios">Usuários</Link></Menu.Item>
          <Menu.Item key="anotacoes" icon={<FileTextOutlined />}><Link to="/anotacoes">Anotações</Link></Menu.Item>
          <Menu.Item key="relatorios" icon={<BarChartOutlined />}><Link to="/relatorios">Relatórios</Link></Menu.Item>
        </Menu>
        <Content style={{ padding: "20px" }}>
          <Card style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            {/* Filtro */}
            <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Space>
                <Select
                  placeholder="Filtrar por tipo"
                  style={{ width: 200 }}
                  value={tipo}
                  onChange={setTipo}
                >
                  <Option value="clientes">Clientes</Option>
                  <Option value="empresas">Empresas</Option>
                </Select>
                <RangePicker onChange={setDataRange} />
                <Button type="primary" icon={<FilterOutlined />} onClick={fetchRelatorios}>
                  Filtrar
                </Button>
              </Space>
              <Button type="primary" icon={<DownloadOutlined />} onClick={handleGenerateReport}>
                Gerar Relatório
              </Button>
            </Space>

            {/* Tabela de Relatórios */}
            <Table
              columns={columns}
              dataSource={relatorios}
              rowKey="id"
              pagination={{
                current: currentPage,
                total,
                pageSize: 10,
                showSizeChanger: false,
              }}
              loading={loading}
              onChange={handleTableChange}
              style={{ marginTop: "20px" }}
            />
          </Card>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center", backgroundColor: "#001529", color: "white" }}>
        Relatórios App ©2024 Criado por Hyuri
      </Footer>
    </Layout>
  );
};

export default Relatorios;
