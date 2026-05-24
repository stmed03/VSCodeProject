import { useState } from 'react';
import { Button, Card, Form, Input, Space, Typography } from 'antd';

const { Title, Paragraph } = Typography;

type FeedbackValues = {
  name: string;
  email: string;
  message: string;
};

export default function Page() {
  const [form] = Form.useForm<FeedbackValues>();
  const [isOpen, setIsOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FeedbackValues | null>(null);

  const onFinish = (values: FeedbackValues) => {
    setSubmittedData(values);
    form.resetFields();
    setIsOpen(true);
  };

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
            Обратная связь
          </Title>

          <Paragraph style={{ fontSize: 16, marginBottom: 0, maxWidth: 720 }}>
            Заполни форму ниже, чтобы отправить сообщение. После отправки появится всплывающее
            окно с введёнными данными.
          </Paragraph>

          <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item
              label="Имя"
              name="name"
              rules={[{ required: true, message: 'Введите имя' }]}
            >
              <Input size="large" placeholder="Введите ваше имя" />
            </Form.Item>

            <Form.Item
              label="Электронная почта"
              name="email"
              rules={[
                { required: true, message: 'Введите email' },
                { type: 'email', message: 'Введите корректный email' },
              ]}
            >
              <Input size="large" placeholder="name@example.com" />
            </Form.Item>

            <Form.Item
              label="Сообщение"
              name="message"
              rules={[{ required: true, message: 'Введите сообщение' }]}
            >
              <Input.TextArea rows={6} placeholder="Напишите сообщение" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Space>
                <Button type="primary" size="large" htmlType="submit">
                  Отправить
                </Button>
                <Button size="large" htmlType="button" onClick={() => form.resetFields()}>
                  Очистить
                </Button>
              </Space>
            </Form.Item>
          </Form>
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
              Данные отправленной формы
            </Title>

            {submittedData && (
              <div style={{ lineHeight: 1.9 }}>
                <div><b>Имя:</b> {submittedData.name}</div>
                <div><b>Email:</b> {submittedData.email}</div>
                <div><b>Сообщение:</b> {submittedData.message}</div>
              </div>
            )}

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