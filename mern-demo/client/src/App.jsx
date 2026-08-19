import { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchStudents = () => {
    fetch('https://stunning-doodle-5g6p5x6ggw4x2744x-5000.app.github.dev/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Lỗi API:', err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = { studentId, name, email };

    fetch('https://stunning-doodle-5g6p5x6ggw4x2744x-5000.app.github.dev/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then(() => {
        fetchStudents();
        setStudentId('');
        setName('');
        setEmail('');
      })
      .catch((err) => console.error('Lỗi khi thêm sinh viên:', err));
  };

  return (
    <div className="notranslate" lang="vi" style={{ maxWidth: '650px', margin: '30px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      <div style={{ background: '#f9f9f9', padding: '20px 25px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h2 style={{ textAlign: 'center', marginTop: 0, color: '#333' }}>Thêm Sinh Viên Mới</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Mã SV:</label>
            <input 
              type="text" 
              value={studentId} 
              onChange={(e) => setStudentId(e.target.value)} 
              placeholder="Nhập mã sinh viên (vd: SV02)"
              required
              style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Họ và Tên:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Nhập họ và tên"
              required
              style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Nhập địa chỉ email"
              required
              style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              marginTop: '10px',
              padding: '10px', 
              backgroundColor: '#007bff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              fontSize: '15px', 
              fontWeight: 'bold',
              cursor: 'pointer' 
            }}
          >
            Thêm Sinh Viên
          </button>
        </form>
      </div>

      <h2 style={{ textAlign: 'center', color: '#333' }}>Danh sách Sinh Viên</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>Mã SV</th>
            <th>Họ và Tên</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;