# Urbanfix Project

A full-stack service booking application connecting customers with local professionals.

## Project Structure

The project is organized into two main directories:
- **service-backend**: The Node.js/Express server API handling authentication, service management, and bookings.
- **service-frontend**: The React client application (built with Vite) for user and provider interfaces.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router DOM.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JSONWebToken (JWT), Bcrypt.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (Local or AtlasURI)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd urbanfix-project
```

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and start the server.

```bash
cd service-backend
npm install

# Create a .env file with your variables (PORT, MONGO_URI, JWT_SECRET, etc.)
# cp .env.example .env

npm run dev
```
The backend server will typically run on `http://localhost:5000` or the port specified in your `.env`.

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, install dependencies, and start the development server.

```bash
cd service-frontend
npm install
npm run dev
```
The frontend will typically run on `http://localhost:5173`.

## Features
- User & Provider Authentication
- Service Listing & Booking
- Dashboard for Users and Providers
- Responsive Design with Tailwind CSS

## Scripts

**Backend:**
- `npm run dev`: Runs the server with Nodemon (auto-restart).
- `npm start`: Runs the server in production mode.

**Frontend:**
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Lints the codebase using ESLint.
