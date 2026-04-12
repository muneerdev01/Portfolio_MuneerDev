from fastapi import APIRouter, HTTPException, status
from app.models.schemas import ContactForm, ContactResponse
from app.services.email_service import EmailService
from app.database import get_database
from datetime import datetime

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("/submit", response_model=ContactResponse)
async def submit_contact_form(form: ContactForm):
    """
    Submit a contact form
    
    Args:
        form: ContactForm data
        
    Returns:
        ContactResponse with status
    """
    try:
        # Save to database
        db = get_database()
        if db:
            await db.contacts.insert_one(form.model_dump())

        # Send email
        email_sent = await EmailService.send_contact_email(form)

        return ContactResponse(
            status="success",
            message="Thank you! Your message has been received. We'll get back to you soon.",
            timestamp=datetime.utcnow()
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get("/messages")
async def get_contact_messages(limit: int = 10):
    """
    Get recent contact form submissions (admin only)
    
    Args:
        limit: Number of messages to return
        
    Returns:
        List of contact messages
    """
    db = get_database()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable"
        )

    messages = await db.contacts.find().sort("timestamp", -1).limit(limit).to_list(length=limit)
    return {"count": len(messages), "messages": messages}
