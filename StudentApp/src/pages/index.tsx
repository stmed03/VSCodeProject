import { Card, Space, Typography } from 'antd';

const { Title, Text } = Typography;

export default function HomePage() {
  return (
    <div style={{ maxWidth: 980 }}>
      <Card
        style={{
          borderRadius: 20,
          border: 'none',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
        }}
        bodyStyle={{ padding: 32 }}
      >
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Title level={2} style={{ margin: 0 }}>
            by Stepan Medvedev
          </Title>
          <Title level={2} style={{ marginTop: 20 }}>
            NMTM-153901
          </Title>
          <Text type="secondary">
            Иван Александрович, Здравствуйте!
          </Text>
        </Space>
      </Card>
    </div>
  );
}