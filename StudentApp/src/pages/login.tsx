import { history } from '@umijs/max';
import { Button, Card, Form, Input, message } from 'antd';

const TOKEN_KEY = 'token';
const USER_KEY = 'userName';

export default function LoginPage() {
  const onFinish = async (values: { userName: string; password: string }) => {
    const res = await fetch('https://localhost:60974/api/Account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      message.error('Неверный логин или пароль');
      return;
    }

    const data = await res.json();

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, data.userName);

    message.success('Вход выполнен');
    history.push('/students');
  };

  return (
    <Card title="Вход" style={{ maxWidth: 400, margin: '80px auto' }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="userName"
          label="Логин"
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Войти
        </Button>
      </Form>
    </Card>
  );
}