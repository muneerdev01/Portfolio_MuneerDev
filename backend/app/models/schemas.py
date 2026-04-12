from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


class DrugModel(BaseModel):
    """Drug information model"""
    rxcui: str  # RxNav Concept ID
    name: str
    strength: Optional[str] = None
    form: Optional[str] = None
    ingredients: List[str] = []

    class Config:
        json_schema_extra = {
            "example": {
                "rxcui": "198440",
                "name": "Aspirin",
                "strength": "500 mg",
                "form": "Tablet",
                "ingredients": ["Aspirin"]
            }
        }


class InteractionResult(BaseModel):
    """Drug interaction result"""
    drug1: str
    drug2: str
    severity: str  # "major", "moderate", "minor"
    description: str
    affected_systems: List[str] = []
    clinical_significance: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "drug1": "Warfarin",
                "drug2": "Aspirin",
                "severity": "major",
                "description": "Increased risk of bleeding",
                "affected_systems": ["Hematologic", "Cardiovascular"],
                "clinical_significance": "May require dose adjustment"
            }
        }


class ContactForm(BaseModel):
    """Contact form submission"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "subject": "Partnership Inquiry",
                "message": "I'm interested in your healthcare automation services..."
            }
        }


class ContactResponse(BaseModel):
    """Contact form response"""
    status: str
    message: str
    timestamp: datetime


class ProjectData(BaseModel):
    """Featured project information"""
    id: str
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    features: List[str] = []

    class Config:
        json_schema_extra = {
            "example": {
                "id": "rxsafe-ai",
                "title": "RxSafe AI (Oh Drug)",
                "description": "Advanced drug interaction checker using RxNav API",
                "technologies": ["FastAPI", "Python", "RxNav API"],
                "github_url": "https://github.com/muneerdev/rxsafe-ai",
                "demo_url": "https://rxsafe.muneerdev.com",
                "features": ["Real-time interaction checking", "Clinical significance scoring"]
            }
        }
