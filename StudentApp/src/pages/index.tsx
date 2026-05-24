import { Button, Card, Space, Tag, Typography } from 'antd';
import yayJpg from '../assets/yay.jpg';

const { Title, Paragraph, Text } = Typography;

export default function HomePage() {
  return (
    <div style={{ maxWidth: 980 }}>
      <Card
        style={{
          borderRadius: 20,
          border: 'none',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{
            padding: 32,
            background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
          }}
        >
          <Space direction="vertical" size={16} style={{ width: '100%' }}>

            <Title level={2} style={{ margin: 0 }}>
              by Stepan Medvedev
            </Title>

            <Title level={2} style={{ marginTop: 20 }}>
              NMTM-153901
            </Title>

          </Space>
        </div>

        <div style={{ padding: 32 }}>
          <img
            src={yayJpg}
            width="100%"
            alt="Yay"
            style={{
              maxWidth: 420,
              width: '100%',
              borderRadius: 16,
              display: 'block',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
          />

          <Text type="secondary" style={{ display: 'block', marginTop: 30 }}>
            Creator selfie.
          </Text>
        </div>
      </Card>
    </div>
  );
}