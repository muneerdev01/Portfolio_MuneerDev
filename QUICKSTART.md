# Quick Start Guide for MuneerDev Portfolio

## Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- Git
- MongoDB Atlas account (or Docker)

## Option 1: Local Development (Without Docker)

### Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

Frontend runs on `http://localhost:3000`

### Setup Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env with MongoDB Atlas connection string

# Run backend
uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`

## Option 2: Docker Compose (Recommended)

### Quickest Setup

```bash
# From project root
docker-compose up

# In another terminal (optional, to view logs)
docker-compose logs -f
```

This starts:
- ✅ Next.js on `http://localhost:3000`
- ✅ FastAPI on `http://localhost:8000`
- ✅ MongoDB on `localhost:27017`

### Stop Everything

```bash
docker-compose down

# Remove volumes (wipe database)
docker-compose down -v
```

## Using the Portfolio

### Visit the Site
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs
- API ReDoc: http://localhost:8000/redoc

### Test Drug Interaction Checker

```bash
# Search for a drug
curl -X GET "http://localhost:8000/api/drugs/search/aspirin"

# Check interaction between two drugs
curl -X POST "http://localhost:8000/api/drugs/check-interaction" \
  -H "Content-Type: application/json" \
  -d '{"drug1": "Warfarin", "drug2": "Aspirin"}'
```

### Submit Contact Form

Fill out the form on the website, or send via API:

```bash
curl -X POST "http://localhost:8000/api/contact/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Partnership Inquiry",
    "message": "I want to work with you..."
  }'
```

## Project Structure

```
Portfolio_MuneerDev/
├── frontend/              # Next.js 15 frontend
│   ├── app/
│   │   ├── components/    # React components
│   │   ├── globals.css    # Tailwind styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── package.json
│   └── tailwind.config.js
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── main.py        # FastAPI app
│   │   ├── config.py      # Config
│   │   ├── database.py    # MongoDB
│   │   ├── models/        # Schemas
│   │   ├── services/      # Business logic
│   │   └── routes/        # API endpoints
│   └── requirements.txt
├── docs/                  # Documentation
│   └── MONGODB_SETUP.md
├── deployment/            # Deployment configs
│   └── AWS_DEPLOYMENT_GUIDE.md
└── README.md
```

## Build for Production

### Frontend

```bash
cd frontend
npm run build
npm run start
```

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
gunicorn app.main:app -w 4 -b 0.0.0.0:8000
```

## Deploy to AWS EC2

Follow the detailed guide:

```bash
# Read the AWS deployment guide
less deployment/AWS_DEPLOYMENT_GUIDE.md
```

Key steps:
1. Launch EC2 instance (Ubuntu 24.04 LTS)
2. Install Node.js, Python, Nginx
3. Deploy frontend and backend
4. Setup systemd services
5. Configure Nginx as reverse proxy
6. Setup SSL with Certbot
7. Point domain to EC2 IP

## Troubleshooting

### Port Already in Use

```bash
# Find what's using port 3000 or 8000
lsof -i :3000
lsof -i :8000

# Kill the process
kill -9 <PID>
```

### MongoDB Connection Error

```bash
# For Docker, ensure MongoDB is running
docker-compose ps

# For Atlas, check your connection string in `.env`
# Make sure IP is whitelisted
```

### Dependencies Issues

```bash
# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Can't Connect to API from Frontend

Check `.env` files match your setup:

**Frontend** (`frontend/.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend** (`backend/.env`):
```
FRONTEND_URL=http://localhost:3000
```

## Key Features

✅ **Dark Mode UI** - Professional dark theme with Tailwind CSS
✅ **Drug Interaction Checker** - RxNav API integration
✅ **Contact Form** - With email notifications
✅ **Responsive Design** - Works on all devices
✅ **MongoDB Integration** - Persistent data storage
✅ **Production Ready** - Nginx, Gunicorn, systemd configs

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, Tailwind CSS |
| Backend | FastAPI, Python 3.10+ |
| Database | MongoDB Atlas |
| Hosting | AWS EC2, Nginx, Certbot |
| Icons | Lucide React |
| HTTP Client | Axios, HTTPX |

## Next Steps

1. ✅ Customize content in components
2. ✅ Add your real project links
3. ✅ Setup MongoDB Atlas cluster
4. ✅ Configure email notifications
5. ✅ Deploy to AWS EC2
6. ✅ Setup custom domain
7. ✅ Monitor and optimize

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [AWS EC2](https://docs.aws.amazon.com/ec2/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

© 2024 Ghulam Muneer Uddin. All rights reserved.

---

**Questions?** Reach out at contact@muneerdev.com
