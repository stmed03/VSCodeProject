import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Form, Input, Space, Tabs, Typography, message } from 'antd';

const { Title, Text } = Typography;

type AuthValues = {
  username: string;
  password: string;
};

type StoredUser = {
  username: string;
  password: string;
};

const USERS_KEY = 'users';
const TOKEN_KEY = 'token';
const USER_KEY = 'userName';

function getUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [{ username: 'admin', password: 'Admin123!' }];
  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [{ username: 'admin', password: 'Admin123!' }];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [loginForm] = Form.useForm<AuthValues>();
  const [registerForm] = Form.useForm<AuthValues>();

  useEffect(() => {
    const current = getUsers();
    setUsers(current);
    if (localStorage.getItem(TOKEN_KEY)) {
      window.location.replace('/students');
    }
  }, []);

  const userMap = useMemo(
    () => new Map(users.map((u) => [u.username.toLowerCase(), u.password])),
    [users],
  );

  const onLogin = (values: AuthValues) => {
    const username = values.username.trim();
    const password = values.password;

    const savedPassword = userMap.get(username.toLowerCase());
    if (savedPassword && savedPassword === password) {
      localStorage.setItem(TOKEN_KEY, 'dev-token');
      localStorage.setItem(USER_KEY, username);
      message.success('Вход выполнен');
      window.location.replace('/students');
      return;
    }

    message.error('Неверный логин или пароль');
  };

  const onRegister = (values: AuthValues) => {
    const username = values.username.trim();
    const password = values.password;

    if (username.length < 3) {
      message.error('Логин должен быть не короче 3 символов');
      return;
    }

    if (password.length < 6) {
      message.error('Пароль должен быть не короче 6 символов');
      return;
    }

    if (userMap.has(username.toLowerCase())) {
      message.error('Пользователь уже существует');
      return;
    }

    const nextUsers = [...users, { username, password }];
    setUsers(nextUsers);
    saveUsers(nextUsers);
    message.success('Регистрация выполнена, теперь войди в аккаунт');
    setMode('login');
    loginForm.resetFields();
    registerForm.resetFields();
    loginForm.setFieldsValue({ username });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f7fb',
        padding: 24,
      }}
    >
      <Card style={{ width: 460, borderRadius: 20, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
        <Title level={2} style={{ marginTop: 0, marginBottom: 8 }}>
          Авторизация
        </Title>
        <Text type="secondary">Можно войти как admin / Admin123! или зарегистрировать нового пользователя.</Text>

        <Tabs
          activeKey={mode}
          onChange={(key) => setMode(key as 'login' | 'register')}
          items={[
            {
              key: 'login',
              label: 'Вход',
              children: (
                <Form form={loginForm} layout="vertical" onFinish={onLogin} style={{ marginTop: 16 }}>
                  <Form.Item label="Логин" name="username" rules={[{ required: true, message: 'Введите логин' }]}>
                    <Input placeholder="admin" />
                  </Form.Item>

                  <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
                    <Input.Password placeholder="Admin123!" />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" block>
                    Войти
                  </Button>
                </Form>
              ),
            },
            {
              key: 'register',
              label: 'Регистрация',
              children: (
                <Form form={registerForm} layout="vertical" onFinish={onRegister} style={{ marginTop: 16 }}>
                  <Form.Item label="Логин" name="username" rules={[{ required: true, message: 'Введите логин' }]}>
                    <Input placeholder="newuser" />
                  </Form.Item>

                  <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
                    <Input.Password placeholder="password123" />
                  </Form.Item>

                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button type="primary" htmlType="submit">
                      Зарегистрироваться
                    </Button>
                    <Button onClick={() => registerForm.resetFields()}>Очистить</Button>
                  </Space>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}