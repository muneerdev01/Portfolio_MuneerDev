import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import get_settings
from app.models.schemas import ContactForm
import asyncio

settings = get_settings()


class EmailService:
    """Service for sending emails"""

    @staticmethod
    async def send_contact_email(contact_form: ContactForm) -> bool:
        """
        Send contact form email
        
        Args:
            contact_form: ContactForm data
            
        Returns:
            True if successful, False otherwise
        """
        if not all([settings.SENDER_EMAIL, settings.SENDER_PASSWORD]):
            print("⚠️  Email configuration not set. Skipping email send.")
            return True  # Don't fail if email not configured

        try:
            # Run in thread pool to avoid blocking
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(
                None,
                EmailService._send_email_sync,
                contact_form
            )
            return True
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False

    @staticmethod
    def _send_email_sync(contact_form: ContactForm) -> None:
        """Synchronous email sending"""
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Contact: {contact_form.subject}"
        msg["From"] = settings.SENDER_EMAIL
        msg["To"] = settings.CONTACT_EMAIL

        # Create HTML email body
        html = f"""
        <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> {contact_form.name}</p>
                <p><strong>Email:</strong> <a href="mailto:{contact_form.email}">{contact_form.email}</a></p>
                <p><strong>Subject:</strong> {contact_form.subject}</p>
                <hr>
                <h3>Message:</h3>
                <p>{contact_form.message.replace(chr(10), '<br>')}</p>
                <hr>
                <p><small>Sent: {contact_form.timestamp.strftime('%Y-%m-%d %H:%M:%S')}</small></p>
            </body>
        </html>
        """

        msg.attach(MIMEText(html, "html"))

        # Send email
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SENDER_EMAIL, settings.SENDER_PASSWORD)
            server.send_message(msg)

        print(f"✅ Email sent to {settings.CONTACT_EMAIL}")
