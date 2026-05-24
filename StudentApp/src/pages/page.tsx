import { useState } from 'react';
import { Button, Form, Input } from 'antd';

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
    <div style={{ maxWidth: 720 }}>
      <h1>Обратная связь</h1>

      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input placeholder="Введите ваше имя" />
        </Form.Item>

        <Form.Item
          label="Электронная почта"
          name="email"
          rules={[
            { required: true, message: 'Введите email' },
            { type: 'email', message: 'Введите корректный email' },
          ]}
        >
          <Input placeholder="name@example.com" />
        </Form.Item>

        <Form.Item
          label="Сообщение"
          name="message"
          rules={[{ required: true, message: 'Введите сообщение' }]}
        >
          <Input.TextArea rows={5} placeholder="Напишите сообщение" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: 16,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 520,
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 16 }}>
              Данные отправленной формы
            </h3>

            {submittedData && (
              <div style={{ lineHeight: 1.8 }}>
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