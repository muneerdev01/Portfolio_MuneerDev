from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import get_settings
from app.database import connect_to_mongo, close_mongo_connection
from app.routes import drugs, contact

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage app startup and shutdown"""
    # Startup
    print("🚀 Starting MuneerDev Portfolio API...")
    await connect_to_mongo()
    yield
    # Shutdown
    print("🛑 Shutting down...")
    await close_mongo_connection()


app = FastAPI(
    title="MuneerDev Portfolio API",
    description="Professional portfolio backend for Ghulam Muneer Uddin - Pharmacist & Automation Expert",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "environment": settings.ENV,
        "version": "1.0.0"
    }


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "MuneerDev Portfolio API",
        "docs": "/docs",
        "openapi": "/openapi.json"
    }


# Include routers
app.include_router(drugs.router)
app.include_router(contact.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
