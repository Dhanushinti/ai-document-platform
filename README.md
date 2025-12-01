# 🧠 AI-Doc Platform — AI Document & PPT Generator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8%2B-blue)
![React](https://img.shields.io/badge/react-19.2-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-latest-009688)

AI-Doc Platform is a **FastAPI + React.js** intelligent document generation system powered by **Google Gemini**.  
It allows users to **create, refine, and export** professional Word and PowerPoint files section-by-section — all with AI assistance.

## ✨ Key Features

✅ **Dynamic Document Generation** – AI-powered content creation  
✅ **Smart Content Refinement** – Custom AI prompts to improve sections  
✅ **User Feedback System** – Like/dislike with comments  
✅ **Multi-Format Export** – Export to `.docx` and `.pptx`  
✅ **Secure Authentication** – JWT-based login system  
✅ **Project Management** – Organize and manage multiple documents  

---

## 📸 Screenshots

### 🔐 Register Page
<img width="960" alt="Register Page" src="https://github.com/user-attachments/assets/23c12294-290c-4323-9bb2-a264868de2fd" />

### 🚪 Login Page
<img width="960" alt="Login Page" src="https://github.com/user-attachments/assets/b5a94340-4eca-4fcd-b29a-26368cf1f5ca" />

### 🏠 Dashboard
<img width="960" alt="Dashboard" src="https://github.com/user-attachments/assets/518adfbe-b047-45f9-a835-8f33a29f1113" />

### 📋 Choose Document Type
<img width="960" alt="Choose Document Type" src="https://github.com/user-attachments/assets/61dc0186-c2ce-48e3-adc8-9c95f99c9335" />

### 🧠 AI Generated Output
<img width="960" alt="AI Output" src="https://github.com/user-attachments/assets/68ff5e76-89af-4b1d-aa05-8c9ac83dae05" />

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
---

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** – [Download here](https://www.python.org/downloads/)
- **Node.js 16+** – [Download here](https://nodejs.org/)
- **npm or yarn** – Comes with Node.js
- **Git** – [Download here](https://git-scm.com/)
- **Google Gemini API Key** – [Get it here](https://ai.google.dev/)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Dhanushinti/ai-document-platform
cd ai-document-platform
```

### 2️⃣ Backend Setup

#### Step 1: Navigate to Backend Directory
```bash
cd backend
```

#### Step 2: Create Virtual Environment

**Windows:**
```powershell
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

#### Step 4: Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
# Create .env file
touch .env  # macOS/Linux
# or
echo. > .env  # Windows
```

Add the following content to `.env`:

```env
# Google Gemini API Configuration
GENAI_API_KEY=your_gemini_api_key_here

# JWT Authentication Configuration
SECRET_KEY=your_super_secret_jwt_key_here_min_32_chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Database Configuration (Optional - SQLite is default)
# DATABASE_URL=sqlite:///./ai_doc_app.db
```

**🔑 How to Get Your Gemini API Key:**
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Navigate to "Get API Key"
4. Create a new API key
5. Copy and paste it into your `.env` file

**🔐 Generate a Secure SECRET_KEY:**
```python
# Run this in Python to generate a secure key
import secrets
print(secrets.token_urlsafe(32))
```

#### Step 5: Run Backend Server
```bash
uvicorn app.main:app --reload
```

Backend will be running at: **http://127.0.0.1:8000**

API Documentation available at: **http://127.0.0.1:8000/docs**

---

### 3️⃣ Frontend Setup

#### Step 1: Open New Terminal & Navigate to Frontend
```bash
cd frontend
```

#### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

#### Step 3: Configure API Endpoint (Optional)

If your backend runs on a different URL, update `frontend/src/api.js`:

```javascript
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',  // Change if needed
});
```

#### Step 4: Run Frontend Development Server
```bash
npm run dev
# or
yarn dev
```

Frontend will be running at: **http://localhost:5173**

---

## 📦 Environment Variables Reference

### Backend Environment Variables

| Variable | Description | Required | Default | Example |
|----------|-------------|----------|---------|--------|
| `GENAI_API_KEY` | Google Gemini API key for AI generation | ✅ Yes | - | `AIzaSyC...` |
| `SECRET_KEY` | Secret key for JWT token encryption | ✅ Yes | - | `your-secret-key-32-chars-min` |
| `ALGORITHM` | JWT signing algorithm | ❌ No | `HS256` | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time in minutes | ❌ No | `30` | `30` |
| `DATABASE_URL` | Database connection string | ❌ No | `sqlite:///./ai_doc_app.db` | `postgresql://user:pass@host/db` |

### Frontend Configuration



## 🚀 Deployment Instructions

### Deploy Backend to Render

#### Step 1: Create Render Account
1. Go to [render.com](https://render.com/)
2. Sign up or log in
3. Click "New +" → "Web Service"

#### Step 2: Configure Service

| Setting | Value |
|---------|-------|
| **Root Directory** | `backend` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn app.main:app --host 0.0.0.0 --port 10000` |
| **Environment** | `Python 3` |

#### Step 3: Add Environment Variables

In Render Dashboard → Environment:

```
GENAI_API_KEY=your_actual_gemini_api_key
SECRET_KEY=your_production_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

#### Step 4: Deploy

Click "Create Web Service" and wait for deployment to complete.

Your backend will be available at: `https://your-app-name.onrender.com`

---

### Deploy Frontend to Vercel

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Navigate to Frontend & Deploy
```bash
cd frontend
vercel
```

#### Step 3: Update API Endpoint

Update `frontend/src/api.js` with your Render backend URL:

```javascript
const api = axios.create({
  baseURL: 'https://your-app-name.onrender.com',
});
```

#### Alternative: Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist/` folder to [Netlify](https://app.netlify.com/drop)

---

## 📚 Usage Examples

### 🔑 User Authentication

#### Register a New User
```bash
POST /register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password123"
}
```

#### Login
```bash
POST /login
Content-Type: application/x-www-form-urlencoded

username=john_doe&password=secure_password123
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

### 📄 Creating a Document Project

1. **Login** to your account
2. Click **"New Project"**
3. Enter project details:
   - **Title**: "Marketing Strategy 2025"
   - **Type**: Select "Document" or "Presentation"
   - **Description** (optional): Brief project overview
4. Click **"Create"**

---

### 🤖 Generating Content with AI

#### Auto-Generate Outline
```bash
POST /generate/outline
Authorization: Bearer {token}
Content-Type: application/json

{
  "project_id": 1,
  "topic": "Digital Marketing Strategy for E-commerce",
  "num_sections": 5
}
```

**AI will generate sections like:**
- Introduction to Digital Marketing
- Market Analysis and Target Audience
- Content Strategy and SEO
- Social Media Marketing Tactics
- Analytics and Performance Metrics

#### Generate Section Content
```bash
POST /generate/section
Authorization: Bearer {token}
Content-Type: application/json

{
  "section_id": 1,
  "additional_context": "Focus on small businesses with limited budgets"
}
```

---

### ✏️ Refining Content

**Example Refinement Prompts:**

1. **Make it more professional:**
   > "Make this section more formal and professional"

2. **Shorten content:**
   > "Summarize this in under 150 words"

3. **Change format:**
   > "Convert this into bullet points"

4. **Add more detail:**
   > "Expand this section with specific examples"

5. **Simplify language:**
   > "Rewrite this for a non-technical audience"

6. **Add statistics:**
   > "Include relevant industry statistics and data"

---

### 💬 Feedback & Comments

#### Like a Section
```bash
POST /feedback/like
Authorization: Bearer {token}

{
  "section_id": 1,
  "liked": true
}
```

#### Add Comment
```bash
POST /comments
Authorization: Bearer {token}

{
  "section_id": 1,
  "comment": "Great content! Maybe add more examples?"
}
```

---

### 📥 Exporting Documents

#### Export as Word Document (.docx)
```bash
GET /export/docx/{project_id}
Authorization: Bearer {token}
```

#### Export as PowerPoint (.pptx)
```bash
GET /export/pptx/{project_id}
Authorization: Bearer {token}
```

Files will be downloaded directly to your device.

---

## 🔄 Complete Workflow

```mermaid
graph TD
    A[🚪 Login/Register] --> B[🏠 Dashboard]
    B --> C[➕ Create New Project]
    C --> D[🤖 Generate Outline with AI]
    D --> E[✨ Generate Section Content]
    E --> F[✏️ Refine Content]
    F --> G[💬 Add Feedback/Comments]
    G --> H{Ready to Export?}
    H -->|No| F
    H -->|Yes| I[📥 Export DOCX/PPTX]
```

**Step-by-Step:**

1. 🔐 **Login/Register** → Create your account or sign in
2. 🏠 **Dashboard** → View all your projects
3. ➕ **Create Project** → Choose Word Doc or PowerPoint
4. 🤖 **Generate Outline** → AI creates section structure
5. ✨ **Generate Content** → AI writes each section
6. ✏️ **Refine Sections** → Use custom prompts to improve
7. 💬 **Add Feedback** → Like/dislike and comment
8. 📥 **Export** → Download final `.docx` or `.pptx`

---

## 🛠️ API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError: No module named 'app'`

**Solution:**
```bash
# Make sure you're in the backend directory
cd backend
# Activate virtual environment
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate      # Windows
```

**Problem:** `GENAI_API_KEY not found`

**Solution:** Ensure `.env` file exists in `backend/` directory with valid API key

### Frontend Issues

**Problem:** `Network Error` or `ERR_CONNECTION_REFUSED`

**Solution:**
- Verify backend is running at http://127.0.0.1:8000
- Check `frontend/src/api.js` has correct `baseURL`

**Problem:** `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# Reinstall
npm install
```

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

If you encounter any issues or have questions:

- 🐛 **Report bugs**: [GitHub Issues](https://github.com/Dhanushinti/ai-document-platform/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Dhanushinti/ai-document-platform/discussions)

---

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on [GitHub](https://github.com/Dhanushinti/ai-document-platform)!

---

## 👨‍💻 Author

**Dhanush Inti**

- B.Tech CSE (Cyber Physical Systems) — VIT Chennai
- AI/ML | Full-Stack Developer | Cloud & Data Enthusiast
- GitHub: [@Dhanushinti](https://github.com/Dhanushinti)

---

## 🚀 Future Enhancements

- [ ] Real-time collaboration
- [ ] Version history and document comparison
- [ ] Support for more document formats (PDF, Markdown)
- [ ] Advanced AI models integration (Claude, GPT-4)
- [ ] Template library
- [ ] Multi-language support
- [ ] Document sharing and permissions

---

<div align="center">

**Made with ❤️ by Dhanush Inti**

</div>
