import { useState } from 'react';
import { Button, Card, Space, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function DocsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const imageUrl =
    'https://avatars.mds.yandex.net/i?id=52349952fe6c44074f5a8a7d618b4618_l-6371016-images-thumbs&n=13';

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
            О программе
          </Title>

          

          <Button type="primary" size="large" onClick={() => setIsOpen(true)}>
            Показать фото
          </Button>
        </Space>
      </Card>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: 16,
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 560,
              background: '#fff',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
            }}
          >
            <Title level={4} style={{ marginTop: 0 }}>
              Фотография
            </Title>

            <img
              src={imageUrl}
              alt="Фото"
              style={{
                width: '100%',
                display: 'block',
                borderRadius: 14,
              }}
            />

            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <Button type="primary" onClick={() => setIsOpen(false)}>
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}