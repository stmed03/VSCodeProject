import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};

export function exportStudentsToExcel(students: Student[]) {
  const data = students.map((s) => ({
    'Имя': s.firstName,
    'Фамилия': s.lastName,
    'Возраст': s.age,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, 'students.xlsx');
}