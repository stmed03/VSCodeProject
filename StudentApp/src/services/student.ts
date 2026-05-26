import http from './http';

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

export function getStudents(search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return http<Student[]>(`/api/StudentsApi${query}`);
}

export function createStudent(data: StudentFormValues) {
  return http<Student>(`/api/StudentsApi`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateStudent(id: number, data: StudentFormValues) {
  return http<void>(`/api/StudentsApi/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, ...data }),
  });
}

export function deleteStudent(id: number) {
  return http<void>(`/api/StudentsApi/${id}`, {
    method: 'DELETE',
  });
}