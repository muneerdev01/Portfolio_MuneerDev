from motor.motor_asyncio import AsyncClient, AsyncDatabase
from app.config import get_settings

settings = get_settings()
client: AsyncClient = None
db: AsyncDatabase = None


async def connect_to_mongo():
    """Connect to MongoDB Atlas"""
    global client, db
    client = AsyncClient(settings.MONGODB_URL)
    db = client[settings.MONGODB_DB_NAME]
    print("✅ Connected to MongoDB Atlas")


async def close_mongo_connection():
    """Close MongoDB connection"""
    global client
    if client:
        client.close()
        print("❌ Closed MongoDB connection")


def get_database() -> AsyncDatabase:
    """Get database instance"""
    return db
