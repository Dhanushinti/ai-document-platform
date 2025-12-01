from fastapi import APIRouter, HTTPException
from ..llm_service import generate_with_gemini

router = APIRouter(prefix="/generate", tags=["AI Generation"])


# ==========================
# 🧩 OUTLINE GENERATION
# ==========================
@router.post("/outline")
def generate_outline(data: dict):
    topic = data.get("topic")
    project_type = data.get("project_type", "docx")  # <- expect "project_type"

    if not topic:
        raise HTTPException(status_code=400, detail="Missing topic")

    try:
        if project_type == "pptx":
            prompt = f"""
            You are an expert presentation content designer.
            Generate 7–10 creative PowerPoint slide titles for a presentation on:
            "{topic}".

            Rules:
            • Titles must flow logically like a storytelling arc.
            • Avoid generic or filler slides (like Introduction, Overview, Conclusion).
            • Use catchy phrasing that makes sense for a professional presentation.
            • Return each title on a new line, numbered.
            """
        else:
            prompt = f"""
            You are an expert document author.
            Create 6–10 section titles for a formal document on:
            "{topic}".

            Rules:
            • Maintain logical progression of topics.
            • Each section should have a distinct focus.
            • Avoid Introduction/Conclusion in titles.
            • Return a simple numbered list.
            """

        outline_text = generate_with_gemini(prompt)
        sections = [
            line.strip("•-1234567890. ").strip()
            for line in outline_text.split("\n")
            if line.strip()
        ]
        return {"outline": sections}      # <- always wrap in {outline: [...]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==========================
# 🧠 DOCUMENT/SLIDE CONTENT
# ==========================
def generate_document_content(topic: str, section_title: str, project_type: str):
    try:
        if project_type == "pptx":
            prompt = f"""
            You are an expert corporate storyteller.
            Create content for one PowerPoint slide.

            Presentation Topic: "{topic}"
            Slide Title: "{section_title}"

            Requirements:
            • Write 6–8 impactful bullet points.
            • Each bullet must be concise but insightful.
            • Maintain logical flow specific to this slide.
            • Avoid repeating previous slides.
            • Avoid generic intros or conclusions.
            • Keep tone professional and engaging.
            • Return only bullet points (no slide numbers or headers).
            """
        else:
            prompt = f"""
            You are a professional research writer.
            Write a comprehensive section for a report.

            Document Topic: "{topic}"
            Section Title: "{section_title}"

            Requirements:
            • Length: around 350–400 words.
            • Tone: formal, coherent, informative.
            • Include relevant insights, data context, and reasoning.
            • No repetition or filler.
            • Return clean paragraph text, ready to include in a report.
            """

        result = generate_with_gemini(prompt)
        if not result or len(result.strip()) < 50:
            return f"(⚠️ Insufficient content generated for '{section_title}')"
        return result.strip()
    except Exception as e:
        print(f"Error generating content for '{section_title}': {e}")
        return f"(Error generating content for '{section_title}')"


# ==========================
# 🔄 REFINEMENT ENDPOINT
# ==========================
@router.post("/refine")
def refine_section(data: dict):
    section_id = data.get("section_id")
    prompt = data.get("prompt")
    content = data.get("content", "")

    if section_id is None or not prompt:
        raise HTTPException(status_code=400, detail="Missing section_id or prompt")

    if not content:
        content = "(No existing content – generate fresh content based on the prompt.)"

    try:
        refine_prompt = f"""
        You are an advanced language editor.

        User instruction:
        "{prompt}"

        Refine ONLY the content below according to the instruction.
        Keep meaning correct and tone consistent unless explicitly asked.
        Return only the improved text, no explanations.

        ---CONTENT START---
        {content}
        ---CONTENT END---
        """
        refined_text = generate_with_gemini(refine_prompt) or content
        return {"content": refined_text.strip()}
    except Exception as e:
        print("Refine error:", e)
        raise HTTPException(status_code=500, detail=f"Refine failed: {e}")
