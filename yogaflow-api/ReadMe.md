# YogaFlow API 🧘‍♀️

A yoga studio management REST API built 
by a certified yoga instructor.

## Features
- Student management
- Class scheduling
- Booking system with capacity tracking
- Duplicate booking prevention
- Cancellation with capacity restoration

## Tech Stack
- Node.js
- Express.js
- Clean Architecture

## API Endpoints

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | Get all students |
| GET | /api/students/:id | Get one student |
| POST | /api/students | Create student |
| PUT | /api/students/:id | Update student |
| DELETE | /api/students/:id | Delete student |

### Classes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/classes | Get all classes |
| GET | /api/classes/:id | Get one class |
| POST | /api/classes | Create class |
| PUT | /api/classes/:id | Update class |
| DELETE | /api/classes/:id | Delete class |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/bookings | Get all bookings |
| GET | /api/bookings/:id | Get one booking |
| POST | /api/bookings | Create booking |
| DELETE | /api/bookings/:id | Cancel booking |

## Business Logic
- Classes have capacity limits
- Students cannot double-book same class
- Cancelling restores class capacity

## Author
Shruti Hadkar — Certified Yoga Instructor & Backend Developer