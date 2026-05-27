import { useState } from 'react';
import { Button, Card, Modal, Space, Typography } from 'antd';

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

          <Paragraph style={{ fontSize: 16, marginBottom: 0, maxWidth: 720 }}>
            Нажми на кнопку ниже, чтобы открыть фотографию в отдельном окне.
          </Paragraph>

          <Button type="primary" size="large" onClick={() => setIsOpen(true)}>
            Показать фото
          </Button>
        </Space>
      </Card>

      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        centered
        width={600}
        title="Фотография"
      >
        <img
          src={imageUrl}
          alt="Фото"
          style={{
            width: '100%',
            display: 'block',
            borderRadius: 14,
          }}
        />
      </Modal>
    </div>
  );
}