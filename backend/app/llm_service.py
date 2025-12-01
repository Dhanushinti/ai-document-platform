# backend/app/llm_service.py

import os
from dotenv import load_dotenv
import google.generativeai as genai

# ======================================
# Load .env safely at import time
# ======================================
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(env_path)

GENAI_API_KEY = os.getenv("GENAI_API_KEY")

if not GENAI_API_KEY:
    raise ValueError("GENAI_API_KEY not found. Please set it in your environment variables or .env file.")

# ======================================
# Configure Gemini
# ======================================
genai.configure(api_key=GENAI_API_KEY)
MODEL_NAME = "models/gemini-2.5-pro"


# ======================================
# Gemini wrapper function
# ======================================
def generate_with_gemini(prompt: str) -> str:
    """
    Generates text from Gemini API using the configured model.
    Returns the text output or an error string.
    """
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)

        # extract clean text
        if hasattr(response, "text") and response.text:
            return response.text.strip()
        elif hasattr(response, "candidates") and response.candidates:
            return response.candidates[0].content.parts[0].text.strip()
        else:
            return "(⚠️ No meaningful response from Gemini.)"

    except Exception as e:
        print(f"❌ Gemini generation error: {e}")
        return f"(Error generating response: {e})"
