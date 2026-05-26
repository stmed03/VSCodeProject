import { useEffect, useMemo, useState } from 'react';
import { history } from '@umijs/max';
import {
  Button,
  Card,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Table,
  Typography,
  message,
} from 'antd';
import { DeleteOutlined, LogoutOutlined } from '@ant-design/icons';
import {
  type Student,
  type StudentFormValues,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '@/services/student';

const { Title, Text } = Typography;
const USER_KEY = 'userName';

export default function StudentsPage() {
  const [form] = Form.useForm<StudentFormValues>();
  const [editForm] = Form.useForm<StudentFormValues>();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const loadStudents = async (searchValue = '') => {
    setLoading(true);
    try {
      const data = await getStudents(searchValue);
      setStudents(data);
    } catch {
      message.error('Не удалось загрузить студентов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    setCount(students.length);
  }, [students]);

  const onAddFinish = async (values: StudentFormValues) => {
    try {
      await createStudent(values);
      message.success('Студент добавлен');
      setIsAddOpen(false);
      form.resetFields();
      await loadStudents(search);
    } catch {
      message.error('Ошибка при добавлении');
    }
  };

  const openEdit = (student: Student) => {
    setEditingStudent(student);
    editForm.setFieldsValue({
      firstName: student.firstName,
      lastName: student.lastName,
      age: student.age,
    });
    setIsEditOpen(true);
  };

  const onEditFinish = async (values: StudentFormValues) => {
    if (!editingStudent) return;

    try {
      await updateStudent(editingStudent.id, values);
      message.success('Студент обновлён');
      setIsEditOpen(false);
      setEditingStudent(null);
      await loadStudents(search);
    } catch {
      message.error('Ошибка при редактировании');
    }
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: 'Удалить студента?',
      content: 'Это действие нельзя отменить.',
      okText: 'Удалить',
      cancelText: 'Отмена',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await deleteStudent(id);
          message.success('Студент удалён');
          await loadStudents(search);
        } catch {
          message.error('Ошибка при удалении');
        }
      },
    });
  };

  const handleSearch = async (value: string) => {
    setSearch(value);
    await loadStudents(value);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem(USER_KEY);
    history.push('/login');
  };

  const columns = useMemo(
    () => [
      { title: '№', dataIndex: 'id', key: 'id', width: 80, align: 'center' as const },
      { title: 'Имя', dataIndex: 'firstName', key: 'firstName' },
      { title: 'Фамилия', dataIndex: 'lastName', key: 'lastName' },
      { title: 'Возраст', dataIndex: 'age', key: 'age', width: 110, align: 'center' as const },
      {
        title: 'Действие',
        key: 'actions',
        width: 240,
        align: 'center' as const,
        render: (_: unknown, record: Student) => (
          <Space>
            <Button onClick={() => openEdit(record)}>Редактировать</Button>
            <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
              Удалить
            </Button>
          </Space>
        ),
      },
    ],
    [],
  );

  const isSearchActive = search.trim().length > 0;
  const isEmptyAfterSearch = isSearchActive && students.length === 0;

  return (
    <div style={{ maxWidth: 1100 }}>
      <Card
        style={{ borderRadius: 20, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}
        extra={
          <Button icon={<LogoutOutlined />} onClick={logout}>
            Выйти
          </Button>
        }
      >
        <Space direction="vertical" size={20} style={{ width: '100%' }}>
          <div>
            <Title level={2} style={{ marginBottom: 8 }}>
              Список студентов
            </Title>
            <Text type="secondary">
              Авторизован как: {localStorage.getItem(USER_KEY) ?? 'неизвестно'}
            </Text>
            <br />
            <Text type="secondary">Количество студентов: {count}</Text>
          </div>

          <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
            <Input.Search
              allowClear
              placeholder="Поиск по имени или фамилии"
              style={{ maxWidth: 360 }}
              onSearch={handleSearch}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                if (!value) handleSearch('');
              }}
            />
            <Button type="primary" onClick={() => setIsAddOpen(true)}>
              Добавить студента
            </Button>
          </Space>

          <Table
            loading={loading}
            columns={columns}
            dataSource={students}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            locale={{
              emptyText: isEmptyAfterSearch ? (
                <Empty description="Ничего не найдено" />
              ) : (
                <Empty description="Нет студентов" />
              ),
            }}
          />
        </Space>
      </Card>

      <Modal
        title="Добавить студента"
        open={isAddOpen}
        onCancel={() => setIsAddOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onAddFinish}>
          <Form.Item label="Имя" name="firstName" rules={[{ required: true, message: 'Введите имя' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Фамилия" name="lastName" rules={[{ required: true, message: 'Введите фамилию' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Возраст" name="age" rules={[{ required: true, message: 'Введите возраст' }]}>
            <InputNumber min={1} max={120} style={{ width: '100%' }} />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Сохранить</Button>
            <Button onClick={() => setIsAddOpen(false)}>Отмена</Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="Редактировать студента"
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={editForm} layout="vertical" onFinish={onEditFinish}>
          <Form.Item label="Имя" name="firstName" rules={[{ required: true, message: 'Введите имя' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Фамилия" name="lastName" rules={[{ required: true, message: 'Введите фамилию' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Возраст" name="age" rules={[{ required: true, message: 'Введите возраст' }]}>
            <InputNumber min={1} max={120} style={{ width: '100%' }} />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Сохранить</Button>
            <Button onClick={() => setIsEditOpen(false)}>Отмена</Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}