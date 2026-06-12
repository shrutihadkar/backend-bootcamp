let students = [
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '9876543210',
      age: 28,
      healthGoals: ['flexibility', 'stress relief'],
      healthIssues: ['back pain'],
      level: 'beginner',
      membershipType: 'monthly',
      isActive: true,
      joinedAt: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Rahul Gupta',
      email: 'rahul@example.com',
      phone: '9876543211',
      age: 35,
      healthGoals: ['weight loss', 'strength'],
      healthIssues: [],
      level: 'intermediate',
      membershipType: 'yearly',
      isActive: true,
      joinedAt: new Date().toISOString()
    }
  ];
  let nextId = 3;
  
  const getAllStudents = () => {
    return students;
  };
  
  const getStudentById = (id) => {
    return students.find(s => s.id === id);
  };
  
  const createStudent = (data) => {
    // Check if email already exists
    const exists = students.find(s => s.email === data.email);
    if (exists) return null;
  
    const student = {
      id: nextId++,
      ...data,
      isActive: true,
      joinedAt: new Date().toISOString()
    };
    students.push(student);
    return student;
  };
  
  const updateStudent = (id, data) => {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;
    students[index] = {
      ...students[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return students[index];
  };
  
  const deleteStudent = (id) => {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;
    return students.splice(index, 1)[0];
  };
  
  module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
  };