# Schedula – Appointment & Booking Management System

Schedula is a full-stack appointment and booking management system built using the MERN stack. It is designed for service-based businesses such as clinics, salons, consultants, and training centers to manage services, schedules, and customer bookings efficiently.

The application supports role-based access control, slot conflict prevention, booking status workflows, in-app notifications, and calendar-based scheduling, closely resembling real-world production systems.

## Features
- User authentication and authorization using JWT
- Role-based access control (Admin and User)
- Service listing and management
- Calendar-based appointment booking
- Slot conflict prevention (no double booking)
- Booking lifecycle management
- In-app notification system
- Admin dashboard for system control

## User Roles

### User (Customer)
- Register and log in
- Browse available services
- View available dates and time slots
- Book appointments
- View booking history
- Cancel upcoming bookings
- Receive booking status notifications

### Admin (Service Provider)
- Create, update, and delete services
- Define available slots
- View all bookings in a calendar view
- Update booking status (Confirm, Complete, Cancel)
- Manage users

## Booking Status Workflow
- Pending – Booking created, awaiting admin confirmation
- Confirmed – Booking approved by admin
- Completed – Service delivered
- Cancelled – Booking cancelled by user or admin

## Slot Conflict Prevention
The system ensures that no two users can book the same service for the same date and time slot. Slot availability is validated at the backend before creating a booking, preventing race conditions and double bookings.

## In-App Notifications
- Booking confirmed
- Booking cancelled
- Appointment completed
Notifications are stored in the database and displayed in a notification center with read and unread states.

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- FullCalendar or React Calendar
- Tailwind CSS or Material UI

### Backend
- Node.js
- Express.js
- RESTful APIs
- JWT Authentication
- Role-based middleware

### Database
- MongoDB
- Mongoose ODM

### Security
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes and APIs

## Data Models

### User
- name
- email
- password
- role (USER or ADMIN)
- isActive

### Service
- name
- description
- duration
- price
- isActive

### Booking
- user
- service
- date
- timeSlot
- status (Pending, Confirmed, Completed, Cancelled)
- createdAt

### Notification
- user
- message
- isRead
- createdAt

