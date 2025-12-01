from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import database, models, schemas, auth

router = APIRouter(prefix="/feedback", tags=["Feedback"])

# ✅ Create or update feedback (Like/Dislike + Comment)
@router.post("/", status_code=status.HTTP_201_CREATED)
def post_feedback(
    feedback_data: schemas.FeedbackRequest,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    section_id = feedback_data.section_id
    is_liked = feedback_data.is_liked
    comment = feedback_data.comment

    section = db.query(models.DocumentSection).filter(
        models.DocumentSection.id == section_id
    ).first()

    if not section:
        raise HTTPException(status_code=404, detail="Section not found")

    # Check for existing feedback
    existing_feedback = db.query(models.Feedback).filter(
        models.Feedback.section_id == section_id,
        models.Feedback.user_id == current_user.id
    ).first()

    if existing_feedback:
        existing_feedback.is_liked = is_liked
        existing_feedback.comment = comment
        db.commit()
        db.refresh(existing_feedback)
        return {"message": "Feedback updated successfully"}

    new_feedback = models.Feedback(
        section_id=section_id,
        user_id=current_user.id,
        is_liked=is_liked,
        comment=comment
    )
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)
    return {"message": "Feedback submitted successfully"}

# ✅ Get all feedback for a section
@router.get("/{section_id}", response_model=List[schemas.FeedbackResponse])
def get_feedback_for_section(
    section_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    feedback_list = db.query(models.Feedback).filter(
        models.Feedback.section_id == section_id
    ).all()

    if not feedback_list:
        raise HTTPException(status_code=404, detail="No feedback found for this section")

    return feedback_list

# ✅ Delete current user's feedback for a section
@router.delete("/{section_id}")
def delete_feedback(
    section_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    feedback_entry = db.query(models.Feedback).filter(
        models.Feedback.section_id == section_id,
        models.Feedback.user_id == current_user.id
    ).first()

    if not feedback_entry:
        raise HTTPException(status_code=404, detail="Feedback not found")

    db.delete(feedback_entry)
    db.commit()
    return {"message": "Feedback removed successfully"}
