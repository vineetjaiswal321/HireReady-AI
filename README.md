# 🚀 HireReady-AI

### AI-Powered Interview Preparation & Performance Platform

HireReady-AI is a full-stack AI-powered interview preparation platform designed to help candidates **practice realistic interviews, receive personalized AI feedback, analyze their performance, and track their progress over time**.

It combines an interactive React frontend with a Node.js/Express backend, MongoDB for persistent data, AI-powered interview evaluation, secure authentication, cloud file handling, email services, and automated PDF report generation.

---

## 🌐 Live Application

**Live Demo:** https://hire-ready-ai-one.vercel.app/

---

## ✨ Why HireReady-AI?

Traditional interview preparation often lacks personalized feedback and realistic practice.

HireReady-AI provides a complete preparation workflow:

**Prepare → Practice → Evaluate → Improve → Track**

Instead of simply displaying interview questions, the platform creates an interactive environment where candidates can practice and understand where they need to improve.

---

## 🎯 Key Features

### 🤖 AI-Powered Mock Interviews

* Generate interview questions dynamically using AI
* Practice interviews based on selected interview parameters
* Interactive question-and-answer workflow
* Realistic interview preparation experience
* AI-assisted evaluation of candidate responses

### 📊 AI Interview Evaluation

After completing an interview, candidates receive structured feedback including:

* Overall performance
* Question-wise evaluation
* Strengths
* Areas for improvement
* AI-generated feedback
* Performance summary

This helps candidates understand **not only what they answered incorrectly, but how they can improve their interview performance.**

### 📈 Interview Performance Tracking

Candidates can review their previous interview sessions and monitor their improvement over time.

The application maintains interview-related data so users can compare previous performance and identify recurring weaknesses.

### 📄 PDF Interview Reports

Interview results can be converted into structured PDF reports for:

* Future reference
* Personal progress tracking
* Sharing
* Offline review

The backend uses PDF processing and browser automation capabilities to support report generation.

### 🔐 Secure Authentication

HireReady-AI includes a complete authentication workflow:

* User registration
* Login
* JWT-based authentication
* Protected routes
* Password reset
* Reset-token expiration
* Authentication middleware
* Session/token handling

### 👤 User Profile

Users can manage their personal profile information and maintain their candidate details from within the application.

### ⚙️ User Settings

The application includes dedicated settings functionality for managing user preferences and application behavior.

### 🎨 Modern Responsive UI

The frontend is built as a responsive React application with a modern component-driven interface designed for both desktop and mobile experiences.

---

# 🏗️ Architecture

HireReady-AI follows a **separated frontend/backend architecture**.

```text
                         ┌──────────────────────┐
                         │      User / Client   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React + Vite UI    │
                         │                      │
                         │  Authentication      │
                         │  Dashboard           │
                         │  Mock Interviews     │
                         │  Reports             │
                         │  Profile             │
                         │  Settings            │
                         └──────────┬───────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Node.js + Express     │
                         │                      │
                         │ Routes               │
                         │ Controllers          │
                         │ Middleware           │
                         │ Services             │
                         │ Models               │
                         └───────┬───────┬──────┘
                                 │       │
                    ┌────────────┘       └─────────────┐
                    ▼                                  ▼
             ┌─────────────┐                    ┌─────────────┐
             │   MongoDB   │                    │  AI Service │
             │             │                    │             │
             │ User Data   │                    │ Question    │
             │ Interviews  │                    │ Generation  │
             │ Reports     │                    │ Evaluation  │
             └─────────────┘                    └─────────────┘

                          Additional Services
                    ┌─────────┬──────────┬──────────┐
                    ▼         ▼          ▼
                Cloudinary  Email      PDF
                            Service   Generation
```

---

# 📁 Project Structure

```text
HireReady-AI/
│
├── Backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controllers.js
│   │   │   ├── interview.controllers.js
│   │   │   ├── mockInterview.controllers.js
│   │   │   ├── profile.controllers.js
│   │   │   └── settings.controllers.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middlewares.js
│   │   │   └── file.middlewares.js
│   │   │
│   │   ├── models/
│   │   │   ├── blacklist.models.js
│   │   │   ├── interviewReport.models.js
│   │   │   ├── mockInterviews.models.js
│   │   │   └── user.models.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── interview.rotes.js
│   │   │   ├── profile.routes.js
│   │   │   └── settings.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── ai.services.js
│   │   │   ├── temp.js
│   │   │   └── testEmail.js
│   │   │
│   │   ├── utils/
│   │   │   ├── ApiError.js
│   │   │   ├── ApiResponse.js
│   │   │   ├── asyncHandler.js
│   │   │   ├── cloudinary.js
│   │   │   └── sendEmail.js
│   │   │
│   │   ├── app.js
│   │   └── constants.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── Frontend/
    │
    ├── public/
    │
    ├── src/
    │   │
    │   ├── Features/
    │   │   ├── auth/
    │   │   │   ├── components/
    │   │   │   ├── hooks/
    │   │   │   ├── pages/
    │   │   │   ├── services/
    │   │   │   └── auth.context.jsx
    │   │   │
    │   │   ├── context/
    │   │   │   └── themeContext.jsx
    │   │   │
    │   │   ├── hooks/
    │   │   │
    │   │   ├── interview/
    │   │   │   ├── pages/
    │   │   │   ├── services/
    │   │   │   └── interview.context.jsx
    │   │   │
    │   │   ├── layout/
    │   │   │   ├── AppNavbar.jsx
    │   │   │   ├── AuthLayout.jsx
    │   │   │   └── PageShell.jsx
    │   │   │
    │   │   ├── profile/
    │   │   │   ├── pages/
    │   │   │   └── services/
    │   │   │
    │   │   └── settings/
    │   │       ├── pages/
    │   │       └── services/
    │   │
    │   ├── App.jsx
    │   ├── app.routes.jsx
    │   ├── index.css
    │   ├── style.scss
    │   └── main.jsx
    │
    ├── package.json
    └── vite.config.js
```

The repository currently follows a feature-oriented frontend structure and a layered backend structure, separating authentication, interviews, profile, settings, API logic, persistence, and supporting services.

---

# 🛠️ Technology Stack

## Frontend

| Technology   | Purpose                |
| ------------ | ---------------------- |
| React        | UI development         |
| Vite         | Frontend build tooling |
| React Router | Client-side routing    |
| Axios        | API communication      |
| Tailwind CSS | Utility-first styling  |
| Sass         | Advanced styling       |
| Lucide React | UI icons               |

The current frontend package configuration uses React 19, Vite, React Router, Axios, Tailwind CSS, Sass and Lucide React.

## Backend

| Technology   | Purpose                |
| ------------ | ---------------------- |
| Node.js      | Runtime environment    |
| Express.js   | REST API framework     |
| MongoDB      | Primary database       |
| Mongoose     | MongoDB ODM            |
| JWT          | Authentication         |
| Google GenAI | AI functionality       |
| Bcrypt       | Password hashing       |
| Multer       | File uploads           |
| Cloudinary   | Cloud file management  |
| Nodemailer   | Email services         |
| Puppeteer    | Browser/PDF automation |
| PDF-Lib      | PDF generation         |
| PDF-Parse    | PDF processing         |
| Zod          | Data validation        |

These technologies are reflected in the current backend dependency configuration.

---

# 🔄 Application Workflow

```text
User Registration / Login
          ↓
      Dashboard
          ↓
  Configure Interview
          ↓
   Start Mock Interview
          ↓
 AI Generates Questions
          ↓
 Candidate Answers
          ↓
 AI Evaluates Responses
          ↓
 Performance Analysis
          ↓
 Interview Report
          ↓
   PDF Report
          ↓
 Track Progress Over Time
```

---

# 🔐 Authentication & Security

HireReady-AI implements a dedicated authentication layer using JWT-based authentication and protected API routes.

The backend separates authentication responsibilities across:

* Authentication controllers
* Authentication routes
* Authentication middleware
* User model
* Password hashing
* Token handling
* Password reset functionality
* Token expiration
* Blacklist/session-related handling

This separation keeps authentication logic isolated from the application's interview and profile functionality.

---

# 🧠 AI Integration

The AI layer is isolated inside the backend service architecture.

```text
Frontend
   │
   ▼
Interview API
   │
   ▼
Interview Controller
   │
   ▼
AI Service
   │
   ▼
Generative AI
   │
   ├── Question Generation
   └── Response Evaluation
```

The backend contains a dedicated `ai.services.js` service, allowing AI-related functionality to remain separated from controllers and routes.

---

# 📊 Interview Reports

Each completed interview can produce a structured performance report.

Reports are designed around:

* Overall performance
* Individual question evaluation
* Strengths
* Weaknesses
* Improvement areas
* AI feedback
* Interview summary

Interview reports have their own MongoDB model, keeping historical interview analysis separate from user and active interview data.

---

# ⚙️ Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/vineetjaiswal321/HireReady-AI.git

cd HireReady-AI
```

## 2. Install frontend dependencies

```bash
cd Frontend
npm install
```

## 3. Install backend dependencies

Open another terminal:

```bash
cd Backend
npm install
```

## 4. Configure environment variables

Create an `.env` file inside the backend directory.

Example configuration:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_API_KEY=your_google_genai_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

> **Important:** Never commit real API keys, database credentials, JWT secrets, email credentials, or other sensitive environment variables to GitHub.

## 5. Start the backend

```bash
cd Backend
npm run dev
```

## 6. Start the frontend

```bash
cd Frontend
npm run dev
```

Open the local Vite URL shown in the terminal.

---

# 🚀 Production Deployment

The project is structured so the frontend and backend can be deployed independently.

### Frontend

Recommended deployment platforms include:

* Vercel
* Netlify

### Backend

The backend can be deployed using platforms such as:

* Render
* Railway
* VPS / Cloud infrastructure

### Required Production Services

Depending on your configuration, production deployment requires:

* MongoDB database
* AI API credentials
* Cloudinary credentials
* Email service credentials
* Secure JWT secret

---

# 📱 Responsive Experience

HireReady-AI is designed with responsive layouts so the core interview workflow can be accessed across different screen sizes.

The frontend separates reusable layouts from individual features, with dedicated components for application navigation, authentication layouts, and page shells.

---

# 🔮 Future Roadmap

Potential future improvements include:

* 🎙️ Voice-based mock interviews
* 🎥 Video interview simulation
* 🧠 More advanced AI evaluation
* 📚 Personalized preparation plans
* 📈 Advanced performance analytics
* 🏆 Interview performance leaderboard
* 🎯 Role-specific interview preparation
* 📄 AI-powered resume analysis
* 🔗 Job-description-based interview generation
* 🌍 Support for additional industries and job roles

---

# 💡 What This Project Demonstrates

HireReady-AI demonstrates practical experience with:

* Full-stack JavaScript development
* React application architecture
* REST API development
* Authentication and authorization
* JWT-based security
* MongoDB data modeling
* AI API integration
* File uploads
* Cloud storage
* Email automation
* PDF generation and processing
* Feature-based frontend architecture
* Layered backend architecture
* Responsive UI/UX development
* Production-oriented deployment

---

# 👨‍💻 Developer

**Vineet Jaiswal**

Full-Stack Developer interested in building practical applications using modern web technologies, AI, and scalable software architecture.

---

# ⭐ Support

If you find **HireReady-AI** useful or interesting, consider giving the repository a ⭐ on GitHub.

**Repository:**
https://github.com/vineetjaiswal321/HireReady-AI

---

### Built with

**React · Vite · Node.js · Express · MongoDB · Mongoose · JWT · Google GenAI · Cloudinary · Nodemailer · Puppeteer**
