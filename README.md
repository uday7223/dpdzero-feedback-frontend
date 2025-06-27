# 📝 DPDZero Feedback System

A lightweight internal feedback system built as part of a Fullstack Developer assignment for DPDZero. This tool enables managers to provide structured feedback to their team members, and employees to view and acknowledge it — all in a secure, clean, and responsive interface.

---

## 🚀 Features

### ✅ Authentication & Authorization
- Secure login system using **JWT tokens**
- Passwords securely stored using **bcrypt**
- Two roles: **Manager** and **Employee**
- Role-based protected routes (frontend & backend)

### ✅ Manager Capabilities
- Submit structured feedback for each team member
- View team members and feedback stats
- Edit/update past feedbacks
- Visualize sentiment trends (Pie Chart)
- View feedback history per employee

### ✅ Employee Capabilities
- View received feedback as a timeline
- Acknowledge (mark as read) each feedback

---

## 🛠️ Tech Stack

| Layer        | Tech Used                             |
| ------------ | ------------------------------------- |
| Frontend     | React (Vite), Bootstrap 5, Sass       |
| Backend      | FastAPI (Python)                      |
| Database     | PostgreSQL                            |
| Auth         | JWT + bcrypt                          |
| Container    | Docker                                |
| Charts       | Chart.js (for sentiment visualization)|

---

## 📂 Folder Structure (Backend)

dpdzero-feedback-backend/
│
├── app/
│ ├── routers/ # FastAPI routers (users, feedback, dashboard)
│ ├── models.py # SQLAlchemy models
│ ├── schemas.py # Pydantic models
│ ├── database.py # DB connection
│ ├── auth.py # Auth logic (hash, token, register)
│ └── oauth2.py # JWT token verification
│
├── main.py # FastAPI app entry point
├── Dockerfile # Backend Docker config
└── requirements.txt # Python dependencies


---

## ⚙️ Setup Instructions

### 🚧 Backend (FastAPI + PostgreSQL)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/dpdzero-feedback-backend.git
cd dpdzero-feedback-backend

# 2. Create .env file
cp .env.example .env
# Fill in DB credentials, SECRET_KEY, ALGORITHM, TOKEN_EXPIRY

# 3. Run with Docker
docker-compose up --build
# This spins up FastAPI + PostgreSQL

The API will be live at:
http://localhost:8000/docs → interactive Swagger UI

💻 Frontend (React + Vite)

# 1. Move to frontend directory
cd dpdzero-feedback-frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

The app runs at:
http://localhost:5173

🔐 Test Credentials (Demo Users)
| Role     | username                                      | Password |
| -------- | --------------------------------------------- | -------- |
| Manager  | manager2                                      | pass     |
| Employee | emp5                                          | pass     |
| Employee | emp5                                          | pass     |

📦 APIs Overview
| Endpoint                  | Description                  |
| ------------------------- | ---------------------------- |
| POST /register            | Register new user            |
| POST /login               | Login, returns JWT token     |
| GET /dashboard/manager    | View team members            |
| POST /feedback/           | Submit feedback              |
| GET /feedback/team        | List feedbacks for team      |
| GET /feedback/employee    | Employee’s received feedback |
| PUT /feedback/{id}        | Edit feedback                |
| PATCH /feedback/{id}/read | Acknowledge feedback         |


📌 Notes

✅ All core MVP features from the assignment are fully implemented.

🔐 Implemented JWT-based authentication and authorization.

🔒 All routes are secured in both frontend and backend — access is restricted based on user roles.

🐳 Backend is fully containerized using Docker (including PostgreSQL).

💻 Built with a clean, responsive UI using Bootstrap 5 + Sass.

🧠 State management handled via React hooks.

🌐 Frontend is live and deployed for public access



🙌 Author
Uday Kumar N
💼 Aspiring Fullstack Developer