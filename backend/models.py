from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class Project(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1)
    tech_stack: List[str]
    link: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ProjectInDB(Project):
    id: str