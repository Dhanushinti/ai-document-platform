🧠 AI-Assisted Document & Presentation Generator
(FastAPI + React + Gemini AI)

An end-to-end AI-powered authoring platform that enables users to generate, refine, and export structured Word (.docx) and PowerPoint (.pptx) documents.

Users can log in, create projects, configure outlines, generate content using Google Gemini, iteratively refine each section using AI prompts, and export final documents — all in one place.

🚀 Features

✅ User Authentication & Project Management

Secure JWT-based login and registration

Dashboard for managing all projects

✅ Document Configuration

Choose between .docx (Word) or .pptx (PowerPoint)

Define structure — sections or slides

AI-suggested outlines for faster setup

✅ AI-Powered Content Generation

Generates contextual text for each section or slide using Gemini API

Stores generated content in the database

✅ Interactive Refinement Interface

Section-by-section refinement using custom AI prompts

Like/Dislike feedback stored per section

Comment box for detailed notes

Seamless in-app regeneration

✅ Document Export

Export fully formatted .docx and .pptx using python-docx and python-pptx

🧩 Tech Stack
Layer	Technologies
Frontend	React.js, Vite, Tailwind CSS, Axios
Backend	FastAPI, SQLAlchemy, Uvicorn
Database	SQLite (can be swapped with PostgreSQL)
AI Engine	Google Gemini API
Auth	JWT Token-based authentication
Export	python-docx, python-pptx

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
ai-doc-platform/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── auth.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── generate.py
│   │   │   ├── refine_feedback.py
│   │   │   ├── export.py
│   ├── requirements.txt
│   ├── .env
│
├── frontend/
│   ├── src/pages/
│   │   ├── Dashboard.jsx
│   │   ├── Editor.jsx
│   │   ├── Login.jsx
│   │   ├── ProjectConfig.jsx
│   ├── package.json
│
└── README.md

🏁 Author

Dhanush Inti
B.Tech CSE (Cyber Physical Systems) — VIT Chennai
AI/ML | Full-Stack Developer | Cloud & Data Enthusiast
