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


## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Dhanushinti/ai-document-platform
cd ai-document-platform

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

## Screen Shots
register page
<img width="2872" height="1446" alt="Screenshot 2025-12-01 090006" src="https://github.com/user-attachments/assets/23c12294-290c-4323-9bb2-a264868de2fd" />
login page
<img width="2878" height="1450" alt="Screenshot 2025-12-01 085723" src="https://github.com/user-attachments/assets/b5a94340-4eca-4fcd-b29a-26368cf1f5ca" />
home page
<img width="2865" height="1433" alt="Screenshot 2025-12-01 085714" src="https://github.com/user-attachments/assets/518adfbe-b047-45f9-a835-8f33a29f1113" />
choose doc type page
<img width="2879" height="1441" alt="Screenshot 2025-12-01 093546" src="https://github.com/user-attachments/assets/61dc0186-c2ce-48e3-adc8-9c95f99c9335" />
output page
<img width="2879" height="1434" alt="Screenshot 2025-12-01 085110" src="https://github.com/user-attachments/assets/68ff5e76-89af-4b1d-aa05-8c9ac83dae05" />

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



🏁 Author

Dhanush Inti
B.Tech CSE (Cyber Physical Systems) — VIT Chennai
AI/ML | Full-Stack Developer | Cloud & Data Enthusiast
