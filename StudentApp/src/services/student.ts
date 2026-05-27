export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};

export type StudentFormValues = {
  firstName: string;
  lastName: string;
  age: number;
};

const API_BASE = 'https://localhost:60974/api/StudentsApi';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('token');

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.status === 204 ? (null as T) : ((await res.json()) as T);
}

export function getStudents(search = '') {
  const url = new URL(API_BASE);
  if (search.trim()) url.searchParams.set('search', search.trim());
  return request<Student[]>(url.toString());
}

export function createStudent(values: StudentFormValues) {
  return request<Student>(API_BASE, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateStudent(id: number, values: StudentFormValues) {
  return request<Student>(`${API_BASE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function deleteStudent(id: number) {
  return request<void>(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
}