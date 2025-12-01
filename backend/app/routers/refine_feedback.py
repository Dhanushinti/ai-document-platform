from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from .. import database, models, schemas, auth
from ..llm_service import generate_with_gemini

router = APIRouter(prefix="/section", tags=["Refine & Feedback"])


# ===============================
# 1️⃣  AI Refinement Endpoint
# ===============================
@router.post("/{section_id}/refine")
def refine_section(
    section_id: int,
    refine_data: schemas.RefineRequest,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    # Fetch the section
    section = (
        db.query(models.DocumentSection)
        .join(models.Project)
        .filter(
            models.DocumentSection.id == section_id,
            models.Project.owner_id == current_user.id,
        )
        .first()
    )
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")

    # Generate refined content using Gemini
    prompt = (
        f"Refine this section based on the instruction below.\n\n"
        f"---\n"
        f"Instruction: {refine_data.prompt}\n\n"
        f"Original Content:\n{section.content}\n\n"
        f"Return only the improved content with same meaning and flow."
    )
    try:
        new_content = generate_with_gemini(prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini refinement failed: {str(e)}")

    # Save refined content
    section.content = new_content
    section.last_refined_at = datetime.utcnow()
    db.commit()
    db.refresh(section)

    return {"message": "Refined successfully", "content": new_content}


# ===============================
# 2️⃣  Like / Dislike / Comment Endpoint
# ===============================
@router.post("/{section_id}/feedback")
def section_feedback(
    section_id: int,
    feedback: schemas.FeedbackRequest,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    section = (
        db.query(models.DocumentSection)
        .join(models.Project)
        .filter(
            models.DocumentSection.id == section_id,
            models.Project.owner_id == current_user.id,
        )
        .first()
    )
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")

    # Update like/dislike/comment if provided
    if feedback.is_liked is not None:
        section.is_liked = feedback.is_liked
    if feedback.comment is not None:
        section.comment = feedback.comment
    section.last_refined_at = datetime.utcnow()

    db.commit()
    db.refresh(section)
    return {"message": "Feedback saved", "section_id": section.id}
