import React from 'react';
import { Link, Outlet, useLocation } from 'umi';
import { Layout, Menu } from 'antd';

const { Footer, Sider, Content } = Layout;

export default function LayoutPage() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const items = [
    { key: '/', label: <Link to="/">Главная</Link> },
    { key: '/docs', label: <Link to="/docs">О программе</Link> },
    { key: '/page', label: <Link to="/page">Обратная связь</Link> },
  ];

  const selectedKey = items.find((item) => item.key === location.pathname)?.key || '/';

  const siderStyle: React.CSSProperties = {
    color: '#fff',
    backgroundColor: '#1677ff',
    padding: 16,
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
  };

  const layoutStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 1200,
    margin: '24px auto',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    background: '#fff',
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Layout style={layoutStyle}>
        <Layout>
          <Sider width={240} style={siderStyle}>
            <div style={{ marginBottom: 16, fontWeight: 700, textAlign: 'center' }}>
              Мой сайт
            </div>

            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              items={items}
              style={{ borderRight: 0 }}
            />
          </Sider>

          <Content style={{ background: '#fff' }}>
            <div style={{ padding: 24, minHeight: 520 }}>
              <Outlet />
            </div>
          </Content>
        </Layout>

        <Footer style={footerStyle}>
          Ant Design ©{currentYear} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}