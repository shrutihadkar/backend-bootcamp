let yogaClasses = [
    {
      id: 1,
      className: 'Hatha Yoga for Beginners',
      instructor: 'Priya Sharma',
      schedule: 'Mon/Wed 8:00 AM',
      duration: '60 mins',
      level: 'beginner',
      capacity: 15,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      className: 'Vinyasa Flow Intermediate',
      instructor: 'Rahul Gupta',
      schedule: 'Tue/Thu 6:30 PM',
      duration: '75 mins',
      level: 'intermediate',
      capacity: 20,
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];
  let nextId = 3;
  
  const getAllYogaClasses = () => {
    return yogaClasses;
  };
  
  const getYogaClassById = (id) => {
    return yogaClasses.find(yc => yc.id === id);
  };
  
  const createYogaClass = (data) => {
    const newYogaClass = {
      id: nextId++,
      ...data,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    yogaClasses.push(newYogaClass);
    return newYogaClass;
  };
  
  const updateYogaClass = (id, data) => {
    const index = yogaClasses.findIndex(yc => yc.id === id);
    if (index === -1) return null;
    
    yogaClasses[index] = {
      ...yogaClasses[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return yogaClasses[index];
  };
  
  const deleteYogaClass = (id) => {
    const index = yogaClasses.findIndex(yc => yc.id === id);
    if (index === -1) return null;
    return yogaClasses.splice(index, 1)[0];
  };
  
  module.exports = {
    getAllYogaClasses,
    getYogaClassById,
    createYogaClass,
    updateYogaClass,
    deleteYogaClass,
    yogaClasses
  };