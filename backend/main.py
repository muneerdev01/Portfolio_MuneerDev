from datetime import datetime
from typing import List
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from pydantic import BaseModel

from database import get_db, close_db
from models import Project

app = FastAPI(title="MuneerDev Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown():
    await close_db()


def serialize_doc(doc: dict) -> dict:
    if doc is None:
        return None
    doc["id"] = str(doc.pop("_id"))
    return doc


@app.get("/")
def root():
    return {"message": "Hello from MuneerDev API", "status": "online"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    db = await get_db()
    cursor = db["projects"].find().sort("created_at", -1)
    projects = await cursor.to_list(length=100)
    return [Project(**{**serialize_doc(p), "created_at": p["created_at"]}) for p in projects]


@app.post("/api/projects", response_model=Project, status_code=status.HTTP_201_CREATED)
async def create_project(project: Project):
    db = await get_db()
    doc = project.model_dump()
    doc["created_at"] = datetime.utcnow()
    result = await db["projects"].insert_one(doc)
    project.id = str(result.inserted_id)
    return project