# MuneerDev Portfolio

Professional portfolio for Ghulam Muneer Uddin - Pharmacist & Automation Expert.

## Project Structure

```
Portfolio_MuneerDev/
├── frontend/          # Next.js 15 frontend (App Router)
├── backend/           # FastAPI Python backend
├── docs/              # Documentation
├── deployment/        # Deployment configs & guides
└── README.md
```

## Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, TypeScript
- **Backend**: FastAPI, Python 3.10+
- **Database**: MongoDB Atlas
- **Hosting**: AWS EC2 (Ubuntu), Nginx, SSL/TLS (Certbot)
- **APIs**: RxNav Drug Interaction API

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
# Runs on http://localhost:8000
```

## Features

✅ Responsive dark-mode UI
✅ Drug interaction checker (RxNav API)
✅ Healthcare dashboard
✅ Contact form with email integration
✅ Professional project showcase
✅ MongoDB integration for data persistence

## Deployment

See [AWS EC2 Deployment Guide](./deployment/AWS_DEPLOYMENT_GUIDE.md) for production setup.

## License

© 2026 Ghulam Muneer Uddin. All rights reserved.
