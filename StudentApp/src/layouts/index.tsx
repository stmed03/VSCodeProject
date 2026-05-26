import React from 'react';
import { Link, Outlet, useLocation } from '@umijs/max';
import { Layout, Menu, Typography } from 'antd';

const { Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function LayoutPage() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const items = [
    { key: '/', label: <Link to="/">Главная</Link> },
    { key: '/docs', label: <Link to="/docs">О программе</Link> },
    { key: '/page', label: <Link to="/page">Обратная связь</Link> },
    { key: '/students', label: <Link to="/students">Список студентов</Link> },
  ];

  const selectedKey = items.find((item) => item.key === location.pathname)?.key || '/';

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fb' }}>
      <Layout
        style={{
          width: '100%',
          maxWidth: 1280,
          margin: '24px auto',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 18px 50px rgba(15, 23, 42, 0.12)',
          background: '#fff',
        }}
      >
        <Layout>
          <Sider
            width={260}
            style={{
              background: 'linear-gradient(180deg, #1677ff 0%, #0958d9 100%)',
              padding: 20,
            }}
          >
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: 28 }}>
                <Title level={3} style={{ color: '#fff', margin: 0 }}>
                  Практические работы
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Клиентская часть приложения
                </Text>
              </div>

              <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                items={items}
                style={{
                  borderRight: 0,
                  borderRadius: 16,
                  padding: 8,
                  background: 'rgba(255,255,255,0.12)',
                }}
              />
            </div>
          </Sider>

          <Content style={{ background: '#f5f7fb' }}>
            <div style={{ padding: 28, minHeight: 620 }}>
              <Outlet />
            </div>
          </Content>
        </Layout>

        <Footer
          style={{
            textAlign: 'center',
            background: '#fff',
            color: '#64748b',
            borderTop: '1px solid #eef2f7',
          }}
        >
          Ant Design ©{currentYear} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}