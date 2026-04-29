from fastapi import FastAPI, Header, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import os
from database import get_db, close_db # آپ کی اپنی فائل سے امپورٹ کیا

app = FastAPI()

# ڈیٹا کا ڈھانچہ (Schema)
class Project(BaseModel):
    title: str
    desc: str
    link: Optional[str] = None

# سرور بند ہونے پر ڈیٹا بیس کلوز کرنے کے لیے
@app.on_event("shutdown")
async def shutdown_event():
    await close_db()

@app.post("/add-project")
async def add_project(
    project: Project, 
    authorization: Optional[str] = Header(None), 
    db = Depends(get_db) # database.py سے ڈیٹا بیس لے رہا ہے
):
    # 1. سیکیورٹی چیک (Token Verification)
    api_token = os.getenv("API_ACCESS_TOKEN")
    expected_token = f"Bearer {api_token}"
    
    if authorization != expected_token:
        raise HTTPException(status_code=401, detail="Unauthorized access")

    # 2. ڈیٹا بیس میں محفوظ کرنا
    # یہاں 'projects' آپ کی کلیکشن کا نام ہے
    result = await db.projects.insert_one(project.dict())
    
    return {
        "status": "success", 
        "message": "Project added to MongoDB", 
        "inserted_id": str(result.inserted_id)
    }

# ٹیسٹ کرنے کے لیے ایک سمپل روٹ
@app.get("/")
async def root():
    return {"message": "Muneer's Portfolio API is Running"}