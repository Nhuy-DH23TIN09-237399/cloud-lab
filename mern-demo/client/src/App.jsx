import React, { useState } from 'react';

export default function App() {
  // Khai báo sẵn 6 sinh viên ngay trong state ban đầu
  const [students, setStudents] = useState([
    { id: 'SV01', name: 'Nguyễn Văn B', email: 'nva@gmail.com' },
    { id: '237389', name: 'Dương Ngọc Thạch Như Ý', email: 's237389@ndu.edu.vn' },
    { id: '237701', name: 'Lê Ngọc Bảo Trân', email: 's237701@ndu.edu.vn' },
    { id: '234082', name: 'Dương Thị Kiều Vy', email: 's234082@ndu.edu.vn' },
    { id: '237070', name: 'Đoàn Mỹ Nhi', email: 's237070@ndu.edu.vn' },
    { id: '237729', name: 'Hồ Trương Thịnh', email: 's237729@ndu.edu.vn' }
  ]);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Thao tác Xóa (Câu 62)
  const handleDelete = (studentId) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sinh viên ${studentId}?`)) {
      setStudents(students.filter((s) => s.id !== studentId));
      alert('Xóa sinh viên thành công!');
    }
  };

  const handleEditClick = (student) => {
    setIsEditing(true);
    setId(student.id);
    setName(student.name);
    setEmail(student.email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setStudents(students.map((s) => (s.id === id ? { ...s, name, email } : s)));
      alert('Cập nhật thành công!');
      resetForm();
    } else {
      setStudents([...students, { id, name, email }]);
      alert('Thêm sinh viên thành công!');
      resetForm();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setId('');
    setName('');
    setEmail('');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Quản Lý Sinh Viên</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '25px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Mã sinh viên (MSSV)"
          value={id}
          onChange={(e) => setId(e.target.value)}
          disabled={isEditing}
          required
          style={{ padding: '8px', flex: '1' }}
        />
        <input
          type="text"
          placeholder="Họ và Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '8px', flex: '2' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '8px', flex: '2' }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: isEditing ? '#007bff' : '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isEditing ? 'Lưu Cập Nhật' : 'Thêm Sinh Viên'}
        </button>
      </form>

      <h3 style={{ textAlign: 'center' }}>Danh Sách Sinh Viên</h3>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>MSSV</th>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button
                  onClick={() => handleEditClick(student)}
                  style={{
                    backgroundColor: '#ffc107',
                    color: '#000',
                    border: 'none',
                    padding: '6px 12px',
                    marginRight: '5px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}