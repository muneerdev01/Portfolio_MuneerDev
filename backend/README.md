# MuneerDev Portfolio Backend

FastAPI backend for the MuneerDev portfolio with RxNav drug interaction API integration.

## Getting Started

### Prerequisites
- Python 3.10+
- MongoDB Atlas cluster
- Virtual environment (venv or conda)

### Installation

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your configuration
```

### Running Locally

```bash
# Start development server
uvicorn app.main:app --reload

# Server runs on http://localhost:8000
# API docs: http://localhost:8000/docs
# ReDoc: http://localhost:8000/redoc
```

## Project Structure

```
backend/
├── app/
│   ├── main.py                  # FastAPI app initialization
│   ├── config.py                # Configuration & environment
│   ├── database.py              # MongoDB connection
│   ├── models/
│   │   └── schemas.py           # Pydantic models
│   ├── services/
│   │   ├── rxnav_service.py     # RxNav API integration
│   │   └── email_service.py     # Email functionality
│   └── routes/
│       ├── drugs.py             # Drug endpoints
│       └── contact.py           # Contact form endpoint
├── requirements.txt
├── .env                         # Environment variables
└── README.md
```

## API Endpoints

### Health Check
```http
GET /health
```

### Drug Operations

#### Search Drug
```http
GET /api/drugs/search/{drug_name}

Example:
GET /api/drugs/search/aspirin

Response:
{
  "rxcui": "123456",
  "name": "Aspirin",
  "strength": "500 mg",
  "form": "Tablet",
  "ingredients": ["Aspirin"]
}
```

#### Get Drug Info
```http
GET /api/drugs/info/{rxcui}

Example:
GET /api/drugs/info/198440

Response:
{
  "rxcui": "198440",
  "name": "Aspirin",
  "strength": "500 mg",
  "form": "Tablet",
  "ingredients": []
}
```

#### Check Drug Interaction
```http
POST /api/drugs/check-interaction

Body:
{
  "drug1": "Warfarin",
  "drug2": "Aspirin"
}

Response:
{
  "drug1": "Warfarin",
  "drug2": "Aspirin",
  "severity": "major",
  "description": "Increased risk of bleeding",
  "affected_systems": ["Hematologic", "Cardiovascular"],
  "clinical_significance": "May require dose adjustment"
}
```

### Contact Form

#### Submit Contact
```http
POST /api/contact/submit

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Partnership Inquiry",
  "message": "I'm interested in your services..."
}

Response:
{
  "status": "success",
  "message": "Thank you! Your message has been received...",
  "timestamp": "2024-04-07T10:30:00"
}
```

#### Get Contact Messages (Admin)
```http
GET /api/contact/messages?limit=10

Response:
{
  "count": 5,
  "messages": [...]
}
```

## Environment Configuration

Create a `.env` file in the backend root:

```env
# Server
HOST=0.0.0.0
PORT=8000
ENV=development
DEBUG=True

# MongoDB Atlas
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/muneerdev
MONGODB_DB_NAME=muneerdev

# CORS
FRONTEND_URL=http://localhost:3000

# Email (optional)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=your_app_password
CONTACT_EMAIL=contact@muneerdev.com

# APIs
RXNAV_API_URL=https://rxnav.nlm.nih.gov/REST

# Security
JWT_SECRET=your_secret_key_here
JWT_ALGORITHM=HS256
```

## MongoDB Setup

See [MongoDB Atlas Setup Guide](../docs/MONGODB_SETUP.md) for detailed instructions.

Quick setup:
1. Create MongoDB Atlas account
2. Create cluster (free M0 tier)
3. Create database user
4. Configure network access
5. Get connection string
6. Add to `.env` as `MONGODB_URL`

## Email Configuration (Optional)

To enable email notifications for contact form submissions:

### Gmail Setup
1. Enable 2-Factor Authentication on your Google account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:
   ```
   SENDER_EMAIL=your_email@gmail.com
   SENDER_PASSWORD=your_app_password
   ```

### Other Email Providers
- **Outlook/Office365**: SMTP server: `smtp-mail.outlook.com`, Port: 587
- **SendGrid**: SMTP server: `smtp.sendgrid.net`, Port: 587
- **Mailgun**: Use Mailgun SMTP credentials

## Testing

```bash
# Test import
python3 -c "from app.main import app; print('✓ Imports successful')"

# Test database connection
python3 -c "from app.database import connect_to_mongo; import asyncio; asyncio.run(connect_to_mongo())"

# Test API with curl
curl -X GET "http://localhost:8000/health"

# Test with httpie (more readable)
http GET localhost:8000/health
```

## Docker (Optional)

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app/ ./app/
COPY .env .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]
```

Build and run:
```bash
docker build -t muneerdev-api .
docker run -p 8000:8000 --env-file .env muneerdev-api
```

## Deployment

### Production Checklist

- [ ] `DEBUG=False` in `.env`
- [ ] `ENV=production`
- [ ] Set strong `JWT_SECRET`
- [ ] Use environment-specific `MONGODB_URL`
- [ ] Configure proper `CORS` origins
- [ ] Enable HTTPS (SSL/TLS)
- [ ] Setup email service
- [ ] Monitor logs and errors
- [ ] Database backups enabled
- [ ] Rate limiting configured (if needed)

### Deploy to AWS EC2

See [AWS EC2 Deployment Guide](../deployment/AWS_DEPLOYMENT_GUIDE.md).

### Deploy with Gunicorn (Production)

```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn app.main:app -w 4 -b 0.0.0.0:8000 --timeout 120
```

### Deploy with PM2

```bash
npm install -g pm2

pm2 start "uvicorn app.main:app --host 0.0.0.0 --port 8000" --name "fastapi"
pm2 startup
pm2 save
```

## Performance Optimization

```bash
# Monitor memory usage
python3 -m memory_profiler app.main

# Profile with cProfile
python3 -m cProfile -s cumtime -m uvicorn app.main:app

# Load testing with Apache Bench
ab -n 1000 -c 10 http://localhost:8000/health
```

## Troubleshooting

### MongoDB Connection Issues

```bash
# Test connection string
python3 << EOF
import asyncio
from motor.motor_asyncio import AsyncClient

async def test():
    uri = "your_connection_string_here"
    client = AsyncClient(uri)
    try:
        await client.admin.command('ping')
        print("✓ Connected to MongoDB")
    except Exception as e:
        print(f"✗ Connection failed: {e}")
    finally:
        client.close()

asyncio.run(test())
EOF
```

### API Not Responding

```bash
# Check if service is running
lsof -i :8000

# Check firewall
sudo ufw status

# Restart service
sudo systemctl restart fastapi
```

### Email Issues

```bash
# Test email configuration
python3 << EOF
import smtplib
from email.mime.text import MIMEText

sender_email = "your_email@gmail.com"
password = "your_app_password"

try:
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, password)
        print("✓ Email configuration working")
except Exception as e:
    print(f"✗ Email error: {e}")
EOF
```

## Technologies Used

- **Framework**: FastAPI (modern, fast Python web framework)
- **Server**: Uvicorn (ASGI server)
- **Database**: FastAPI with Motor (async MongoDB driver)
- **Validation**: Pydantic (data validation)
- **HTTP Client**: HTTPX (async HTTP client)
- **Email**: Python SMTP
- **APIs**: RxNav (public drug interaction API)

## What is RxNav?

RxNav is the NIH's public API for drug information and interactions. It's maintained by the National Library of Medicine and provides:

- Drug name searching
- RxCUI (RxNav Concept Unique ID) mapping
- Drug interactions database
- Clinical significance information

Learn more: https://rxnav.nlm.nih.gov/

## License

© 2024 Ghulam Muneer Uddin. All rights reserved.

## Support

For issues or questions:
- 📧 Email: contact@muneerdev.com
- 💼 LinkedIn: https://linkedin.com/in/muneer-dev-57871b3b4/
