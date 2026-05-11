# 🚗 Car Booking - Full-Stack Web Application

![Banner](https://img.shields.io/badge/Fullstack-Project-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb)

A premium, full-stack car booking platform designed for seamless vehicle rentals. Featuring role-based access control, real-time updates, and a modern, responsive UI.

🔗 **Live Demo:** [https://iridescent-crostata-2d702f.netlify.app/](https://car-rent-amber-mu.vercel.app/)

---

## ✨ Key Features

### 👤 User Features
- **Modern Authentication:** Secure sign-up and login powered by Firebase and JWT.
- **Browse Cars:** Explore a wide range of available vehicles with detailed specifications.
- **Booking System:** Easy-to-use booking flow with instant confirmations.
- **My Bookings:** Dedicated dashboard to track and manage personal bookings.
- **Responsive Design:** Optimized for mobile, tablet, and desktop experiences.

### 👑 Owner/Admin Features
- **Car Management:** Add, edit, and list cars for the platform.
- **User Management:** Promote regular users to "Owner" roles.
- **Booking Overview:** Track all bookings made on listed vehicles.
- **Performance:** Optimized image handling via ImageKit.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS 4 & DaisyUI 5
- **State Management:** TanStack React Query & React Context API
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Notifications:** SweetAlert2

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5
- **Database:** MongoDB with Mongoose ODM
- **Auth:** Firebase Auth & JSON Web Token (JWT)
- **File Handling:** Multer & ImageKit SDK
- **Environment:** Dotenv

---

## 📂 Project Structure

```bash
car-booking-project/
├── client/          # Frontend React application
│   ├── src/         # Components, Pages, Hooks, Config
│   └── public/      # Static assets
└── server/          # Backend Express application
    ├── modules/     # Business logic (Car, User, Booking)
    ├── router/      # API Route definitions
    └── config/      # Database and external service configs
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd car-booking-project
```

### 2. Setup Client
```bash
cd client
npm install
npm run dev
```

### 3. Setup Server
```bash
cd server
npm install
npm run server
```

---

## 📝 License
This project is [ISC](LICENSE) licensed.

Created with ❤️ by [Mamun](https://github.com/mamun-jsx)
