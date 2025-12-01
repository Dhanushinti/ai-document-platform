from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.orm import relationship
from .database import Base


# =======================
# User Model
# =======================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    projects = relationship("Project", back_populates="owner")


# =======================
# Project Model
# =======================
class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    project_type = Column(String, nullable=False)  # "docx" or "pptx"
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    owner = relationship("User", back_populates="projects")
    sections = relationship("DocumentSection", back_populates="project", cascade="all, delete-orphan")


# =======================
# Document Section Model
# =======================
class DocumentSection(Base):
    __tablename__ = "document_sections"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"))
    order_index = Column(Integer, default=0)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=True)

    # Feedback & Refinement fields
    is_liked = Column(Boolean, nullable=True)        # 👍 True | 👎 False | None = not rated
    comment = Column(String, nullable=True)          # user comment
    last_refined_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="sections")

    # ✅ Link feedback entries (new)
    feedback_entries = relationship("Feedback", back_populates="section", cascade="all, delete-orphan")


# =======================
# 🗳 Feedback Model (Like / Dislike / Comment)
# =======================
class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    section_id = Column(Integer, ForeignKey("document_sections.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    is_liked = Column(Boolean, default=None)
    comment = Column(Text, nullable=True)

    # Relationships
    section = relationship("DocumentSection", back_populates="feedback_entries")
    user = relationship("User")
