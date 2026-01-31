# Notify 📝🔐

**Notify** is a secure MERN stack note manager application that allows users to create, manage, and access personal notes safely with authentication and protected routes.

---

## 🚀 Features

- 🔐 JWT-based authentication (Login & Register)
- 🛡️ Protected routes for authorized users
- 📝 Create, Read, Update, Delete (CRUD) notes
- 👤 User-specific note access
- 🌐 RESTful API using Express & Node.js
- ⚛️ Modern React frontend with protected routing

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 📁 Project Structure

```bash
notify-mern/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   ├── index.html
│   └── package.json
│
└── README.md
⚙️ Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/apurv-anand-dev/notify-mern.git
cd notify-mern

2️⃣ Backend setup
cd backend
npm install
npm run dev

3️⃣ Frontend setup
cd frontend
npm install
npm run dev

🔐 Environment Variables

Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


⚠️ .env is ignored for security reasons.

👨‍💻 Author

Apurv Anand
MERN Stack Developer
GitHub: https://github.com/apurv-anand-dev