const { yogaClasses } = require('./classes.service');
const { students } = require('./students.service');


let bookings = [
    {
      id: 1,
      className: 'Hatha Yoga for Beginners',
      studentId: 1,
      classId:1,
      bookingDate: new Date().toISOString(),
      status: 'comfirmed'
    },

    {
        id: 2,
        className: 'vinyasa Yoga for Beginners',
        studentId: 2,
        classId:2,
        bookingDate: new Date().toISOString(),
        status: 'cancelled'
      },
    
  ];
  let nextId = 3;

  
  const getAllBookings = () => {
    return bookings;
  };
  
  const getBookingsById = (id) => {
    return bookings.find(yc => yc.id === id);
  };

  const createBookings = (studentId, classId) => {
    // Find the class
    const yogaClass = yogaClasses.find(c => c.id === classId);
    if (!yogaClass) return { error: 'Class not found', code: 404 };
  
    // Check if class is full
    if (yogaClass.currentBookings >= yogaClass.capacity) {
      return { error: 'Class is fully booked', code: 400 };
    }
  
    // Check if student already booked
    const existing = bookings.find(
      b => b.studentId === studentId && b.classId === classId
    );
    if (existing) return { error: 'Already booked', code: 409 };
  
    // Create booking
    const booking = {
      id: nextId++,
      studentId,
      classId,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
  
    bookings.push(booking);
    yogaClass.currentBookings = (yogaClass.currentBookings || 0) + 1;
    return booking;
  };
  
  
  const cancelBookings = (id) => {
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    // Change status to cancelled
    bookings[index].status = 'cancelled';
    
    // Decrease class capacity
    const yogaClass = yogaClasses.find(c => c.id === bookings[index].classId);
    if (yogaClass && yogaClass.currentBookings > 0) {
      yogaClass.currentBookings--;
    }
    
    return bookings[index];
  };
  
module.exports = { getAllBookings,
getBookingsById,
createBookings,
cancelBookings
  };