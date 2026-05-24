import { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Space, Table, Typography, message } from 'antd';

const { Title, Text } = Typography;

type Student = {
  id: number;
  name: string;
  surname: string;
  age: number;
};

type StudentFormValues = {
  name: string;
  surname: string;
  age: number;
};

export default function StudentsPage() {
  const [form] = Form.useForm<StudentFormValues>();
  const [students, setStudents] = useState<Student[]>([
    { id: 3, name: 'Иван', surname: 'Петров', age: 20 },
    { id: 2, name: 'Анна', surname: 'Смирнова', age: 19 },
    { id: 1, name: 'Дмитрий', surname: 'Козлов', age: 21 },
  ]);
  const [count, setCount] = useState(0);
  const [nextId, setNextId] = useState(4);

  useEffect(() => {
    setCount(students.length);
  }, [students]);

  const onFinish = (values: StudentFormValues) => {
    const newStudent: Student = {
      id: nextId,
      name: values.name.trim(),
      surname: values.surname.trim(),
      age: values.age,
    };

    setStudents((prev) => [newStudent, ...prev]);
    setNextId((prev) => prev + 1);
    form.resetFields();
    message.success('Студент добавлен');
  };

  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((item) => item.id !== id));
    message.success('Студент удалён');
  };

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      width: 90,
      align: 'center' as const,
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age',
      width: 110,
      align: 'center' as const,
    },
    {
      title: 'Действие',
      key: 'actions',
      width: 180,
      align: 'center' as const,
      render: (_: unknown, record: Student) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Удалить
        </Button>
      ),
    },
  ];

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
        <Space direction="vertical" size={20} style={{ width: '100%' }}>
          <div>
            <Title level={2} style={{ marginBottom: 8 }}>
              Список студентов
            </Title>
            <Text type="secondary">Количество студентов: {count}</Text>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Space wrap align="start" size={16} style={{ width: '100%' }}>
              <Form.Item
                label="Имя студента"
                name="name"
                rules={[{ required: true, message: 'Введите имя студента' }]}
                style={{ marginBottom: 0, width: 220 }}
              >
                <Input size="large" placeholder="Иван" />
              </Form.Item>

              <Form.Item
                label="Фамилия"
                name="surname"
                rules={[{ required: true, message: 'Введите фамилию' }]}
                style={{ marginBottom: 0, width: 220 }}
              >
                <Input size="large" placeholder="Петров" />
              </Form.Item>

              <Form.Item
                label="Возраст"
                name="age"
                rules={[{ required: true, message: 'Введите возраст' }]}
                style={{ marginBottom: 0, width: 160 }}
              >
                <InputNumber size="large" min={1} max={120} style={{ width: '100%' }} placeholder="20" />
              </Form.Item>

              <Form.Item label=" " style={{ marginBottom: 0 }}>
                <Button type="primary" size="large" htmlType="submit">
                  Добавить
                </Button>
              </Form.Item>
            </Space>
          </Form>

          <Table
            columns={columns}
            dataSource={students}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Space>
      </Card>
    </div>
  );
}