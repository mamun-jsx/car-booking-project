# ⚙️ Car Booking - Server Side

The backend of the Car Booking application is a robust RESTful API built with **Express 5** and **MongoDB**, designed with a modular architecture for scalability.

## 🚀 Technologies

- **Node.js & Express 5:** Fast and minimalist web framework.
- **MongoDB & Mongoose:** NoSQL database with object data modeling.
- **JWT:** Secure authentication token handling.
- **ImageKit:** Cloud-based image optimization and delivery.
- **Multer:** Middleware for handling `multipart/form-data` (file uploads).
- **Dotenv:** Environment variable management.

## 📦 Key Scripts

- `npm run server`: Starts the server using **Nodemon** for development.
- `npm start`: Starts the server using standard **Node**.

## 📂 Folder Structure

- `modules/User`: User management logic, routes, and controllers.
- `modules/Car`: Car listing, updates, and availability logic.
- `modules/Booking`: Car booking processes and tracking.
- `router`: Global route definitions.
- `config`: Database connection and external service integration.
- `middleware`: Custom middleware (Auth, Error handling).

## 📡 API Endpoints

| Resource | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth/User** | `/api/user` | Register, login, and profile management |
| **Cars** | `/api/cars` | CRUD operations for car listings |
| **Bookings** | `/api/bookings` | Book a car, view user/owner bookings |

## 🔧 Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   IMAGEKIT_PUBLIC_KEY=your_key
   IMAGEKIT_PRIVATE_KEY=your_key
   IMAGEKIT_URL_ENDPOINT=your_endpoint
   ```
4. Start the server:
   ```bash
   npm run server
   ```

---
[Return to Root README](../README.md)
