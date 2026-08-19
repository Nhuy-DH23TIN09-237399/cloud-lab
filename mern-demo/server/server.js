const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Dữ liệu ban đầu đầy đủ 6 sinh viên của bạn
let students = [
  { id: 'SV01', name: 'Nguyễn Văn B', email: 'nva@gmail.com' },
  { id: '237389', name: 'Dương Ngọc Thạch Như Ý', email: 's237389@nctu.edu.vn' },
  { id: '237701', name: 'Lê Ngọc Bảo Trân', email: 's237701@nctu.edu.vn' },
  { id: '234082', name: 'Dương Thị Kiều Vy', email: 's234082@nctu.edu.vn' },
  { id: '237070', name: 'Đoàn Mỹ Nhi', email: 's237070@nctu.edu.vn' },
  { id: '237729', name: 'Hồ Trương Thịnh', email: 's237729@nctu.edu.vn' }
];

// 1. [GET] Lấy danh sách sinh viên
app.get('/api/students', (req, res) => {
  res.json(students);
});

// 2. [POST] Thêm mới sinh viên
app.post('/api/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 3. [PUT] Cập nhật sinh viên (Câu 61)
app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const index = students.findIndex((s) => (s.id || s._id || s.mssv) === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Không tìm thấy sinh viên!' });
  }

  students[index] = { ...students[index], name, email };
  return res.status(200).json({ message: 'Cập nhật thành công!', data: students[index] });
});

// 4. [DELETE] Xóa sinh viên (Câu 62)
app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = students.length;

  students = students.filter((s) => (s.id || s._id || s.mssv) !== id);

  if (students.length === initialLength) {
    return res.status(404).json({ message: 'Không tìm thấy sinh viên để xóa!' });
  }

  return res.status(200).json({ message: 'Xóa sinh viên thành công!' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));