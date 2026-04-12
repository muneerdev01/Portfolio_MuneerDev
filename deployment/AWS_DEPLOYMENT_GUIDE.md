# AWS EC2 Deployment Guide

Complete step-by-step guide to deploy the MuneerDev Portfolio to AWS EC2.

## Prerequisites

- AWS Account with billing enabled
- SSH key pair created
- Terminal/PowerShell access
- Domain name (optional: muneerdev.com)

## Architecture Overview

```
┌─────────────┐
│  Browser    │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────┐
│  Nginx Reverse  │
│  Proxy (Port80) │─── SSL/TLS
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
  Next.js   FastAPI
  (3000)    (8000)
  
    ▼
 MongoDB Atlas
```

## Part 1: EC2 Instance Setup

### Step 1: Launch EC2 Instance

1. **Go to AWS EC2 Dashboard**
2. **Click "Launch Instance"**
3. **Configure Instance**:
   - **Name**: `muneerdev-portfolio`
   - **AMI**: Ubuntu 24.04 LTS (free tier eligible)
   - **Instance Type**: `t2.micro` (free tier) or `t2.small` for better performance
   - **Key Pair**: Select or create your SSH key
   - **Network Settings**:
     - Allow SSH (22) from your IP
     - Allow HTTP (80) from anywhere
     - Allow HTTPS (443) from anywhere
   - **Storage**: 20GB (default is fine)

4. **Review and Launch**

### Step 2: Connect to Instance

```powershell
# Windows PowerShell - Copy your key to the correct location
# Download your .pem file and save it in your .ssh folder

# Connect via SSH
ssh -i "C:\path\to\your\key.pem" ubuntu@your-ec2-public-ip
# Linux/Mac:
ssh -i /path/to/your/key.pem ubuntu@your-ec2-public-ip
```

## Part 2: System Setup

Once connected to your EC2 instance:

### Step 1: Update System

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y curl wget git
```

### Step 2: Install Node.js (for Next.js)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
```

### Step 3: Install Python (for FastAPI)

```bash
sudo apt install -y python3 python3-pip python3-venv
python3 --version
```

### Step 4: Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 5: Install Certbot for SSL

```bash
sudo apt install -y certbot python3-certbot-nginx
```

## Part 3: Deploy Applications

### Step 1: Clone Repository

```bash
mkdir -p ~/projects
cd ~/projects
git clone https://github.com/muneerdev/portfolio.git
cd portfolio
```

### Step 2: Deploy Frontend (Next.js)

```bash
cd frontend
npm install

# Create .env.production
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_CONTACT_EMAIL=contact@muneerdev.com
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/muneer-dev-57871b3b4/
NEXT_PUBLIC_FREELANCER_URL=https://www.freelancer.com/u/muneerdev
NEXT_PUBLIC_DOMAIN=muneerdev.com
EOF

# Build for production
npm run build

# Verify build success
ls -la .next/
```

### Step 3: Deploy Backend (FastAPI)

```bash
cd ../backend
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with production values
cat > .env << EOF
HOST=127.0.0.1
PORT=8000
ENV=production
DEBUG=False

# MongoDB Atlas - Replace with your actual connection string
MONGODB_URL=mongodb+srv://muneerdev:PASSWORD@cluster0.xxxxx.mongodb.net/muneerdev?retryWrites=true&w=majority
MONGODB_DB_NAME=muneerdev

FRONTEND_URL=http://muneerdev.com

# Email Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=your_app_password
CONTACT_EMAIL=contact@muneerdev.com

RXNAV_API_URL=https://rxnav.nlm.nih.gov/REST

JWT_SECRET=your_very_secure_secret_key_here_change_this
JWT_ALGORITHM=HS256
EOF

# Test the API
deactivate
```

## Part 4: Create Systemd Services

### Step 1: Next.js Service

```bash
sudo tee /etc/systemd/system/nextjs.service > /dev/null << EOF
[Unit]
Description=Next.js Portfolio Frontend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/projects/portfolio/frontend
Environment="NODE_ENV=production"
Environment="PORT=3000"
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable nextjs
sudo systemctl start nextjs
sudo systemctl status nextjs
```

### Step 2: FastAPI Service

```bash
sudo tee /etc/systemd/system/fastapi.service > /dev/null << EOF
[Unit]
Description=FastAPI Portfolio Backend
After=network.target

[Service]
Type=notify
User=ubuntu
WorkingDirectory=/home/ubuntu/projects/portfolio/backend
Environment="PATH=/home/ubuntu/projects/portfolio/backend/venv/bin"
ExecStart=/home/ubuntu/projects/portfolio/backend/venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable fastapi
sudo systemctl start fastapi
sudo systemctl status fastapi
```

## Part 5: Nginx Configuration

### Step 1: Create Nginx Config

```bash
sudo tee /etc/nginx/sites-available/muneerdev > /dev/null << 'EOF'
upstream nextjs {
    server 127.0.0.1:3000;
}

upstream fastapi {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name muneerdev.com www.muneerdev.com your-ec2-ip;

    # Next.js Frontend
    location / {
        proxy_pass http://nextjs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API Backend
    location /api/ {
        proxy_pass http://fastapi;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }

    # Deny access to sensitive files
    location ~ /\.env {
        deny all;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/muneerdev /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 2: Keep Default Nginx (Temporary)

If you don't have a domain yet:

```bash
sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
upstream nextjs {
    server 127.0.0.1:3000;
}

upstream fastapi {
    server 127.0.0.1:8000;
}

server {
    listen 80 default_server;
    listen [::]:80 default_server;

    # Redirect to Next.js
    location / {
        proxy_pass http://nextjs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API Backend
    location /api/ {
        proxy_pass http://fastapi;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

sudo systemctl restart nginx
```

## Part 6: SSL/TLS Setup (HTTPS)

### Option 1: With Domain Name

```bash
# Point your domain to your EC2 public IP first

# Get SSL certificate
sudo certbot --nginx -d muneerdev.com -d www.muneerdev.com

# Follow the prompts:
# 1. Enter your email
# 2. Agree to terms
# 3. Certbot will automatically configure Nginx
```

### Option 2: Self-Signed Certificate (Development)

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/muneerdev-self-signed.key \
  -out /etc/ssl/certs/muneerdev-self-signed.crt

# Add to your Nginx config:
# listen 443 ssl;
# ssl_certificate /etc/ssl/certs/muneerdev-self-signed.crt;
# ssl_certificate_key /etc/ssl/private/muneerdev-self-signed.key;
```

### Step 2: Verify SSL

```bash
sudo certbot certificates
sudo systemctl restart nginx
```

## Part 7: Monitoring & Maintenance

### Check Service Status

```bash
# Check all services
sudo systemctl status nextjs fastapi nginx

# View logs
sudo journalctl -u nextjs -f
sudo journalctl -u fastapi -f
sudo journalctl -u nginx -f
```

### Setup Log Rotation

```bash
sudo tee /etc/logrotate.d/portfolio > /dev/null << EOF
/var/log/portfolio/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 ubuntu ubuntu
    sharedscripts
}
EOF
```

### Update Services

```bash
cd ~/projects/portfolio

# Frontend
cd frontend
git pull
npm install
npm run build
sudo systemctl restart nextjs

# Backend
cd ../backend
git pull
source venv/bin/activate
pip install -r requirements.txt
deactivate
sudo systemctl restart fastapi
```

## Part 8: Firewall Setup

```bash
# If using Ubuntu firewall
sudo ufw enable
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw status
```

## Part 9: Domain Configuration

If you have muneerdev.com:

1. **Update A Record**:
   - Go to your domain registrar
   - Set A record to your EC2 public IP
   - Wait for DNS propagation (5-30 minutes)

2. **Test Domain**:
   ```bash
   nslookup muneerdev.com
   dig muneerdev.com
   ```

3. **Update Nginx** (if using domain):
   ```bash
   sudo sed -i 's/your-ec2-ip/muneerdev.com www.muneerdev.com/g' /etc/nginx/sites-available/muneerdev
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Troubleshooting

### Port Already in Use
```bash
# Find what's using the port
sudo lsof -i :3000
sudo lsof -i :8000

# Kill the process
sudo kill -9 <PID>
```

### Service Not Starting
```bash
# Check logs
sudo journalctl -u nextjs -n 50
sudo journalctl -u fastapi -n 50

# Manually test services
cd ~/projects/portfolio/frontend
npm start

cd ~/projects/portfolio/backend
source venv/bin/activate
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

### Nginx Issues
```bash
sudo nginx -t  # Test config
sudo systemctl restart nginx
```

### MongoDB Connection
```bash
# Test connection from backend
cd backend
source venv/bin/activate
python3 -c "import asyncio; from app.database import connect_to_mongo; asyncio.run(connect_to_mongo())"
```

## Security Checklist

- [ ] SSH key stored securely
- [ ] Firewall only allows necessary ports
- [ ] SSL/TLS certificate installed
- [ ] Environment variables not in git
- [ ] Database credentials secured
- [ ] Regular backups enabled
- [ ] Updates applied regularly
- [ ] Logs monitored for errors
- [ ] Email SMTP credentials secured
- [ ] API rate limiting configured (optional)

## Performance Optimization

```bash
# Enable Nginx compression
sudo nano /etc/nginx/nginx.conf
# Add: gzip on;

# Increase Node.js memory (if needed)
export NODE_OPTIONS=--max-old-space-size=1024

# Use PM2 for process management (optional)
sudo npm install -g pm2
pm2 start /home/ubuntu/projects/portfolio/frontend/npm start --name "nextjs"
pm2 start "uvicorn app.main:app" --name "fastapi"
pm2 startup
pm2 save
```

## Next Steps

1. ✅ Deploy and test on EC2
2. ✅ Setup custom domain
3. ✅ Enable HTTPS
4. ✅ Monitor performance
5. Scale if needed (RDS for database, CloudFront for CDN, etc.)

## Support & Resources

- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Certbot Documentation](https://certbot.eff.org/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
