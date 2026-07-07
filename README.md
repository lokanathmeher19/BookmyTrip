# TripEase - MERN Stack Travel Booking Platform

TripEase is a modern, responsive, and full-stack travel booking application that allows users to search and book trains, flights, buses, and hotels from one unified interface.

## Tech Stack
- **Frontend:** React 18 (Vite), React Router v6, Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (Access Tokens), bcrypt

## Features
- **User Authentication:** Register, login, and secure user dashboard.
- **Search System:** Search for trains, flights, buses, and hotels with Framer Motion animated tab switching.
- **Booking Flow:** Passenger details collection and mock payment integration.
- **Dynamic UI:** Clean, card-based interface with floating search widget and soft shadows.

## Project Structure
This is a monorepo containing both the frontend client and backend server.
- `/client`: Vite React application.
- `/server`: Node.js Express API.

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string.

### Setup Instructions

1. **Install Root Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   The server expects a `.env` file in the `/server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/tripease
   JWT_SECRET=supersecretjwtkeyfordevelopmentonly
   ```
   *Note: If you use MongoDB Atlas, replace `MONGODB_URI` with your connection string.*

3. **Database Seeding**
   To populate the database with initial dummy data (trains, flights, hotels, offers), run:
   ```bash
   npm run server --prefix server
   # In another terminal or before running the server:
   cd server
   npm run seed
   ```

4. **Run the Application**
   From the root folder (`Irctc`), run:
   ```bash
   npm run dev
   ```
   This will start both the frontend Vite server and the backend Express server concurrently.
   - Client will run on `http://localhost:5173`
   - Server will run on `http://localhost:5000`

## Author
Built as part of an AI agent scaffolding task.
