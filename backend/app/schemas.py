from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr


# =======================
# User Schemas
# =======================
class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str
    full_name: Optional[str] = None


class UserResponse(UserBase):
    id: int
    full_name: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# =======================
# Auth / Token Schemas
# =======================
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


# =======================
# Section (Document) Schemas
# =======================
class SectionBase(BaseModel):
    title: str


class SectionCreate(SectionBase):
    pass


# The section response with feedback
class SectionResponse(BaseModel):
    id: int
    title: str
    order_index: int
    content: str
    is_liked: Optional[bool]
    comment: Optional[str]

    class Config:
        from_attributes = True


# =======================
# Project Schemas
# =======================
class ProjectBase(BaseModel):
    title: str
    project_type: str  # "docx" or "pptx"


class ProjectCreate(ProjectBase):
    sections: Optional[List[SectionCreate]] = None


class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    owner_id: int
    sections: List[SectionResponse]

    class Config:
        from_attributes = True


# =======================
# Content Generation Schemas
# =======================
class GenerateRequest(BaseModel):
    topic: str
    doc_type: str
    sections: Optional[List[str]] = None


class GenerateResponse(BaseModel):
    outline: List[str]
    content: Optional[str] = None


# =======================
# Refinement and Feedback Schemas
# =======================
class RefineRequest(BaseModel):
    section_id: int
    prompt: str


class FeedbackRequest(BaseModel):
    section_id: int
    is_liked: Optional[bool] = None   # ✅ make optional
    comment: Optional[str] = None

    class Config:
        from_attributes = True


class FeedbackResponse(BaseModel):
    id: int
    section_id: int
    user_id: int
    is_liked: bool
    comment: Optional[str] = None

    class Config:
        from_attributes = True


# =======================
# Export Schema
# =======================
class ExportRequest(BaseModel):
    project_id: int
    file_format: str  # "docx" or "pptx"
