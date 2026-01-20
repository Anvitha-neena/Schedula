# SCHEDULA — Salon Appointment & Scheduling Platform
### Technical Documentation (MERN Stack)

---

## 1. Introduction

### 1.1 Purpose
Schedula is a full-stack Salon Appointment Booking & Scheduling Platform built using the MERN stack. It enables users to book salon services online and allows salon administrators to manage services, schedules, time slots, and appointments efficiently.

### 1.2 Target Audience
- General salon customers
- Users booking services online
- Salon administrators/staff
- Small & medium salon businesses
- Developers learning real-world scheduling systems

### 1.3 Learning Outcomes
- JWT authentication and role-based access
- REST API development
- MongoDB schema modeling
- Building scheduling logic
- React component architecture
- Full-stack application structuring
- GitHub workflow usage

---

## 2. System Overview

### 2.1 User Roles
- **User:** Books services, manages appointments, views notifications  
- **Admin:** Manages services, schedules, bookings, and confirmations  

### 2.2 Core Features
- Secure login/register
- Browse salon services
- Book appointments with time slots
- Slot conflict prevention
- Booking status workflow
- Notification center
- Admin dashboard with calendar view

---

## 3. High-Level Architecture
[ React Frontend ]
|
----- REST API -----
|
[ Node.js + Express ]
|
[ MongoDB ]


---

## 4. Database Design

### 4.1 Collections

#### 4.1.1 users
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "role": "user | admin"
}
```
#### 4.1.2 services
```json
{
  "name": "string",
  "description": "string",
  "duration": "number",
  "price": "number",
  "isActive": "boolean"
}
```
#### 4.1.3 bookings
```json
{
  "user": "ObjectId",
  "service": "ObjectId",
  "date": "string",
  "startTime": "string",
  "endTime": "string",
  "status": "Pending | Confirmed | Completed | Cancelled",
  "notes": "string"
}
```
#### 4.1.4 notifications
```json
{
  "user": "ObjectId",
  "message": "string",
  "type": "booking | system",
  "isRead": "boolean"
}
```
## 5. Backend Design
#### 5.1 Tech Stack
Node.js
Express.js
MongoDB + Mongoose
JWT authentication
Bcrypt password hashing

#### 5.2 Folder Structure
backend/
  controllers/
  models/
  routes/
  middleware/
  services/
  utils/
  app.js

#### 5.3 Authentication Flow
1. User logs in/registers
2. JWT token generated
3. Token verifies protected routes
4. Admin routes validated by role

#### 5.4 API Endpoints
Auth APIs
  POST /auth/register
  POST /auth/login
  GET /auth/me

Service APIs
  POST /services
  GET /services
  PUT /services/:id
  DELETE /services/:id
Booking APIs
  POST /bookings
  GET /bookings/my
  GET /bookings/admin
  PUT /bookings/status/:id
  DELETE /bookings/:id

Notification APIs
  GET /notifications
  PUT /notifications/read/:id

#### 5.5 Role-Based Access Control
JWT verification
Admin-only routes protected
Users restricted to their own bookings

## 6. Frontend Design (React)

### 6.1 Tech Stack
- React  
- React Router  
- Axios  
- Context API / Redux  
- TailwindCSS / Material UI  

### 6.2 Folder Structure
src/  
  components/  
  pages/  
  context/  
  hooks/  
  services/  
  App.jsx  

### 6.3 Key Pages
- Login/Register  
- Home (Services List)  
- Booking Page  
- My Bookings  
- Notification Center  
- Admin Dashboard  
- Manage Services  
- Manage Bookings  
- Calendar View  

## 7. Security Considerations
- JWT-based authentication  
- Password hashing (bcrypt)  
- Protected routes  
- Input validation  
- Booking slot conflict prevention  

## 8. Development Workflow
- Use meaningful commit messages  
- Test APIs in Postman  
- Integrate frontend after backend testing  
- Push code regularly  
- Maintain clean folder structure  

## 9. Future Enhancements
- Email/SMS alerts  
- Online payments  
- Stylist-wise booking  
- Multi-branch support  
- Customer loyalty system  

## 10. Week-wise Project Plan

### Weeks 1–3: Foundation
- MERN basics  
- Understanding salon booking flow  
**Deliverable:** Architecture diagram  

### Weeks 4–6: Backend Development
- Node.js + Express  
- CRUD APIs  
**Deliverable:** Basic backend  

### Weeks 7–9: Database Integration
- MongoDB setup  
- Mongoose schemas  
**Deliverable:** Collections with CRUD  

### Weeks 10–11: Authentication & Security
- JWT authentication  
- Role-based access  
**Deliverable:** Secured login  

### Weeks 12–14: Frontend Development
- React pages  
- API integration  
**Deliverable:** Complete UI  

### Week 15: Final Integration & Demo
- Testing & deployment  
**Deliverable:** Fully working app  

## 11. GitHub Repository Guidelines
- One repository for the entire project  
- Folder structure:  
root/  
  frontend/  
  backend/  
- Push code regularly  
- Avoid committing .env  
- Ensure repo is accessible  

## 12. Conclusion
Schedula is a complete full-stack appointment booking system designed to handle real-world salon scheduling. It integrates authentication, service management, booking logic, slot conflict prevention, and a modern frontend to deliver a smooth user and admin experience.
