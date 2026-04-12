from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional


class Settings(BaseSettings):
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    ENV: str = "development"
    DEBUG: bool = True

    # Database
    MONGODB_URL: str
    MONGODB_DB_NAME: str = "muneerdev"

    # CORS
    FRONTEND_URL: str = "http://localhost:3000"

    # Email
    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SENDER_EMAIL: Optional[str] = None
    SENDER_PASSWORD: Optional[str] = None
    CONTACT_EMAIL: str = "contact@muneerdev.com"

    # APIs
    RXNAV_API_URL: str = "https://rxnav.nlm.nih.gov/REST"

    # Security
    JWT_SECRET: str = "your_secret_key_here"
    JWT_ALGORITHM: str = "HS256"

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings():
    return Settings()
