# 🧠 AI-Doc Platform — AI Document & PPT Generator  

AI-Doc Platform is a **FastAPI + React.js** intelligent document generation system powered by **Google Gemini**.  
It allows users to **create, refine, and export** professional Word and PowerPoint files section-by-section — all with AI assistance.  

This platform enables:
✅ Dynamic document generation  
✅ AI-driven content refinement  
✅ User feedback & commenting  
✅ Export to `.docx` and `.pptx`  
✅ Seamless login and project management  

---

## 🧩 Tech Stack  

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React.js, Vite, Tailwind CSS, Axios |
| **Backend** | FastAPI, Uvicorn, SQLAlchemy |
| **Database** | SQLite (default), can be replaced with PostgreSQL |
| **AI Engine** | Google Gemini API |
| **Export Tools** | python-docx, python-pptx |
| **Auth** | JWT Token-based Authentication |

---

## ✨ Features  

- 🔐 **User Authentication (JWT)** – Secure login and registration  
- 🧾 **Project Creation** – Create document or presentation projects  
- 🤖 **AI Content Generation** – Powered by Google Gemini  
- 🪄 **Section Refinement** – Provide custom AI prompts to improve or shorten content  
- 👍 **Feedback System** – Like/dislike each section with comments  
- 💬 **Comment Saving** – Save section-wise notes and feedback  
- 📤 **Export Options** – Download `.docx` or `.pptx` files instantly  
- ⚙️ **Full-Stack Ready** – Clean React frontend + FastAPI backend  

---

## 🧱 Project Structure  

```bash
ai-doc-platform/
├── backend/
│   ├── app/
│   │   ├── main.py                # FastAPI entry point
│   │   ├── auth.py                # Authentication routes & logic
│   │   ├── database.py            # SQLAlchemy engine & DB session
│   │   ├── models.py              # User, Project, Section, Feedback models
│   │   ├── schemas.py             # Pydantic schemas for validation
│   │   ├── llm_service.py         # Gemini API integration for content generation
│   │   └── routers/
│   │       ├── auth.py            # Login / Register routes
│   │       ├── generate.py        # Generate outline & section content via AI
│   │       ├── refine_feedback.py # Handle feedback, likes/dislikes, comments
│   │       ├── export.py          # Export DOCX / PPTX documents
│   │       └── projects.py        # Project CRUD logic
│   ├── requirements.txt           # Backend dependencies
│   ├── .env                       # Environment variables (ignored in Git)
│   └── ai_doc_app.db              # SQLite database (ignored in Git)
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Project overview
│   │   │   ├── Editor.jsx         # AI refinement and feedback page
│   │   │   ├── Login.jsx          # Authentication UI
│   │   │   └── ProjectConfig.jsx  # Configure project outline & AI generation
│   │   ├── api.js                 # Axios instance for backend API calls
│   │   ├── App.jsx                # Routing & global layout
│   │   └── main.jsx               # Entry point
│   ├── package.json               # Frontend dependencies
│   ├── tailwind.config.js         # Tailwind CSS config
│   └── vite.config.js             # Vite build config
│
├── .gitignore
├── README.md
└── requirements.txt               # Root-level for Render deployment


⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone [https://github.com/<your-username>/ai-doc-platform](https://github.com/Dhanushinti/ai-document-platform)
cd ai-doc-platform

2️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # (or source venv/bin/activate on Mac/Linux)
pip install -r requirements.txt


Create a .env file in /backend and add:

GENAI_API_KEY=your_gemini_api_key_here
SECRET_KEY=your_jwt_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30


Run backend locally:

uvicorn app.main:app --reload

3️⃣ Frontend Setup

cd ../frontend
npm install
npm run dev


🌍 Deployment (Render Setup)
Setting	Value
Root Directory	backend
Build Command	pip install -r requirements.txt
Start Command	uvicorn app.main:app --host 0.0.0.0 --port 10000

Add Environment Variables in Render:

GENAI_API_KEY = your_gemini_api_key


Frontend can be deployed separately on Vercel/Netlify, with API base URL set to your Render backend.

🧑‍💻 Usage Flow

Login / Register

Create Project → Choose Word or PPTX

Add or Generate Outline using AI

Generate Full Document via Gemini API

Refine Each Section (Shorten, Rephrase, etc.)

Add Comments or Feedback (Like/Dislike)

Export Final Document

🧾 Example Prompts

“Make this section more formal.”

“Convert this into bullet points.”

“Summarize in under 100 words.”

📦 Folder Structure
```bash
ai-doc-platform/
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI entry point
│   │   ├── auth.py               # User authentication (JWT)
│   │   ├── models.py             # SQLAlchemy models
│   │   ├── schemas.py            # Pydantic schemas
│   │   ├── llm_service.py        # Gemini API integration & refinement logic
│   │   └── routers/
│   │       ├── auth.py           # Login & Register routes
│   │       ├── generate.py       # AI document generation
│   │       ├── refine_feedback.py# AI refinement, like/dislike, comments
│   │       ├── export.py         # Export DOCX/PPTX
│   │       └── projects.py       # Project CRUD operations
│   ├── requirements.txt          # Backend dependencies
│   ├── .env                      # Environment variables (ignored in Git)
│   └── ai_doc_app.db             # SQLite database (ignored in Git)
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx     # Project list view
│   │   │   ├── Editor.jsx        # Interactive editor (AI refine/comments)
│   │   │   ├── Login.jsx         # Authentication UI
│   │   │   └── ProjectConfig.jsx # Outline setup & AI suggestion
│   │   ├── App.jsx               # React router setup
│   │   ├── main.jsx              # Entry point
│   │   └── api.js                # Axios API service
│   ├── package.json              # Frontend dependencies
│   └── tailwind.config.js        # Tailwind setup
│
├── .gitignore
├── README.md
└── requirements.txt              # Root-level requirements (for Render)
```

🏁 Author

Dhanush Inti
B.Tech CSE (Cyber Physical Systems) — VIT Chennai
AI/ML | Full-Stack Developer | Cloud & Data Enthusiast
