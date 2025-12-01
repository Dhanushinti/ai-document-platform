from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List

from .. import database, models, schemas, auth, doc_generator
from . import generate as gen_router

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.post("/", response_model=schemas.ProjectResponse)
def create_project(
    project: schemas.ProjectCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    db_project = models.Project(
        title=project.title,
        project_type=project.project_type,
        owner_id=current_user.id,
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    if project.sections:
        for idx, sec in enumerate(project.sections):
            content_text = gen_router.generate_document_content(
                project.title,
                sec.title,
                project.project_type,
            )
            section_row = models.DocumentSection(
                project_id=db_project.id,
                order_index=idx,
                title=sec.title,
                content=content_text,
            )
            db.add(section_row)
        db.commit()
        db.refresh(db_project)

    return db_project


@router.get("/", response_model=List[schemas.ProjectResponse])
def list_projects(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    return (
        db.query(models.Project)
        .filter(models.Project.owner_id == current_user.id)
        .all()
    )


@router.get("/{project_id}", response_model=schemas.ProjectResponse)
def get_project(
    project_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    project = (
        db.query(models.Project)
        .filter(
            models.Project.id == project_id,
            models.Project.owner_id == current_user.id,
        )
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    project.sections.sort(key=lambda s: s.order_index)
    return project


@router.get("/{project_id}/export")
def export_project(
    project_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    project = (
        db.query(models.Project)
        .filter(
            models.Project.id == project_id,
            models.Project.owner_id == current_user.id,
        )
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    try:
        buf, media_type, filename = doc_generator.generate_document_file(project)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    headers = {"Content-Disposition": f'attachment; filename="{filename}"'}
    return StreamingResponse(buf, media_type=media_type, headers=headers)
