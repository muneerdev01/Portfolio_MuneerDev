import os
from datetime import datetime
from typing import List
from fastapi import FastAPI, HTTPException, Depends, status, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security.api_key import APIKeyHeader
from bson import ObjectId
from pydantic import BaseModel
from mangum import Mangum  # Vercel کے لیے لازمی ہے

# آپ کی اپنی فائلیں
from database import get_db, close_db
from models import Project

app = FastAPI(title="MuneerDev Portfolio API", version="1.0.0")

# --- Security Setup ---
API_KEY_NAME = "X-API-KEY"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)
# Vercel Environment Variables سے کی اٹھائے گا، ورنہ ڈیفالٹ استعمال کرے گا
API_KEY = os.getenv("API_ACCESS_TOKEN", "muneer-secret-key")

async def get_api_key(api_key_header: str = Security(api_key_header)):
    if api_key_header == API_KEY:
        return api_key_header
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized: Access Denied"
        )

# --- CORS Configuration ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://portfolio-muneer-dev.vercel.app",
        "https://www.muneerdev.com",
        "https://muneerdev.com"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

handler = Mangum(app)

@app.on_event("shutdown")
async def shutdown():
    await close_db()

def serialize_doc(doc: dict) -> dict:
    if doc is None:
        return None
    doc["id"] = str(doc.pop("_id"))
    return doc

# --- Routes ---

@app.get("/")
def root():
    return {"message": "Hello from MuneerDev API", "status": "online"}

@app.get("/api/hello")
def hello():
    return {"message": "Hello from FastAPI on Vercel!"}

@app.get("/health")
def health():
    return {"status": "ok"}

# Projects حاصل کرنا (یہ پبلک رکھا جا سکتا ہے یا سیکیور بھی)
@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    db = await get_db()
    cursor = db["projects"].find().sort("created_at", -1)
    projects = await cursor.to_list(length=100)
    return [Project(**{**serialize_doc(p), "created_at": p["created_at"]}) for p in projects]

# Project بنانا (اسے سیکیور کر دیا گیا ہے)
@app.post("/api/projects", response_model=Project, status_code=status.HTTP_201_CREATED, dependencies=[Depends(get_api_key)])
async def create_project(project: Project):
    db = await get_db()
    doc = project.model_dump()
    doc["created_at"] = datetime.utcnow()
    result = await db["projects"].insert_one(doc)
    project.id = str(result.inserted_id)
    return project