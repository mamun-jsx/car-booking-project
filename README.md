# Car Booking Fullstack Web Application

## Project Summary

This is a **fullstack car booking web application** with role-based access. Users can create an account, login, logout, and book cars. Owners can promote other users to "owner" role, allowing them to list cars and manage bookings. The project is **fully mobile responsive** and uses **SweetAlert2** for interactive alerts.

---

### ------------------------------------Frontend----------------------------------

## Technology is used

- React ^19.1.1
- React DOM ^19.1.1
- React Router DOM ^7.8.2
- @tanstack/react-query ^5.86.0
- Tailwind CSS ^4.1.12
- @tailwindcss/vite ^4.1.12
- Axios ^1.11.0
- Firebase ^12.2.1
- Lucide React ^0.542.0
- Motion ^12.23.12
- SweetAlert2 ^11.22.5
- React Fast Marquee ^1.6.5

 <!-- Authentication  -->

\*\*\* Use Firebase For Authentication and use context apis to handle user State

### Frontend

## ----> Clone the repo :

```bash
cd client
npm install --> install everything
npm run dev --> to run the project into local host
```

## ------------------------------------Backend----------------------------------

## Technology is used

- Node.js & Express ^5.1.0
- MongoDB & Mongoose ^8.18.0
- Cors ^2.8.5
- Dotenv ^17.2.1
- Multer ^2.0.2
- ImageKit ^6.0.0 (for optimized image uploads)
- JSON Web Token ^9.0.2
- Nodemon ^3.1.10

### User

- Sign up (Take the user data during user Registration and store into mongoDB)

- Book cars
- User List
- Role-based access
- Booking details

### Owner

- Promote users to owners
- List cars for booking
- Manage bookings

### General

- Fully responsive for all devices
- SweetAlert2 for interactive notifications
- Modular backend architecture
- Image optimization using ImageKit
- File uploads handled by Multer

  \*\*\* Use mongoose so that the crud operation and query can be easy

### Backend

## ----> Clone the repo :

```bash
cd server
npm install --> install everything
npm run server --> to run the project into local host
```
