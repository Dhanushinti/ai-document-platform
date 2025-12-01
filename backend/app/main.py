from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database
from .routers import auth, projects, generate, comments, export,  refine_feedback
import os
# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="AI Document Platform Backend")

# CORS for frontend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(generate.router)
app.include_router(comments.router)
app.include_router(export.router)
app.include_router(refine_feedback.router)
print(f"✅ GENAI_API_KEY loaded: {os.getenv('GENAI_API_KEY')[:10]}********")


@app.get("/")
def root():
    return {"message": "AI Document Platform API is running"}
