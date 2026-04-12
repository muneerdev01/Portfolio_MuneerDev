# MongoDB Atlas Setup Guide

This guide will walk you through setting up a MongoDB Atlas cluster for the MuneerDev Portfolio.

## Prerequisites

- MongoDB Atlas account (create free at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
- Basic MongoDB knowledge

## Step 1: Create a MongoDB Atlas Cluster

1. **Sign in** to your MongoDB Atlas account
2. **Create a new project**:
   - Click "New Project"
   - Name it "MuneerDev"
   - Select your organization
   - Click "Create Project"

3. **Create a cluster**:
   - Click "Create a Database"
   - Choose **M0 Shared** (Free tier - perfect for this project)
   - Select your preferred cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region closest to your deployment location
   - Click "Create"

4. **Wait for deployment** (2-5 minutes)

## Step 2: Create a Database User

1. In the left sidebar, click **Database Access**
2. Click **Add New Database User**
3. **Choose Authentication Method**: 
   - Select "Password"
4. **Create username and password**:
   - Username: `muneerdev`
   - Auto-generate password (copy it somewhere safe)
   - Or create your own strong password
5. **Database User Privileges**:
   - Select "Atlas Admin"
6. Click **Add User**

## Step 3: Configure Network Access

1. In the left sidebar, click **Network Access**
2. Click **Add IP Address**
3. **For development**: 
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is convenient but not recommended for production
4. **For production**:
   - Add your specific server IP address (e.g., your AWS EC2 instance IP)
5. Click **Confirm**

## Step 4: Get Your Connection String

1. Go to **Databases** and click **Connect** on your cluster
2. Choose **Connect your application**
3. Select **Driver: Python** and **Version: 3.11 or later**
4. **Copy the connection string**:
   ```
   mongodb+srv://muneerdev:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Replace `<password>`** with your database user password

## Step 5: Update Environment Variables

1. In your backend `.env` file, update:
   ```
   MONGODB_URL=mongodb+srv://muneerdev:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/muneerdev?retryWrites=true&w=majority
   MONGODB_DB_NAME=muneerdev
   ```

2. Make sure to replace:
   - `YOUR_PASSWORD` - Your database user password
   - `cluster0.xxxxx` - Your actual cluster information

## Step 6: Test the Connection

Run the FastAPI backend to test the connection:

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

You should see:
```
✅ Connected to MongoDB Atlas
```

## Creating Collections

The backend automatically creates collections as needed. However, you can manually create indexes for better performance:

1. Go to **Collections** in your cluster
2. Create a database named `muneerdev`
3. The backend will create these collections upon first use:
   - `contacts` - Contact form submissions
   - `drugs` - Cached drug information
   - `interactions` - Cached interaction data

## Optional: Create Indexes for Performance

```javascript
// In MongoDB Atlas Web Shell or compass, run:

// Contacts collection
db.contacts.createIndex({ "timestamp": -1 })
db.contacts.createIndex({ "email": 1 })

// Drugs collection
db.drugs.createIndex({ "rxcui": 1 }, { unique: true })
db.drugs.createIndex({ "name": "text" })

// Interactions collection  
db.interactions.createIndex({ "drug1_rxcui": 1, "drug2_rxcui": 1 }, { unique: true })
```

## MongoDB Atlas Security Best Practices

✅ **Do:**
- Use strong passwords (16+ characters with mixed case, numbers, symbols)
- Restrict network access to known IPs in production
- Enable two-factor authentication on your Atlas account
- Regularly review access logs
- Use VPC peering for private connectivity (paid tier)

❌ **Don't:**
- Share connection strings publicly
- Use "Allow Anyone" in production
- Commit `.env` files with real credentials to git
- Use the same password across databases

## Monitoring & Maintenance

1. **Monitor your cluster**:
   - Click your cluster name
   - Go to **Metrics** tab
   - Watch connections, operations, network throughput

2. **Backup**:
   - Atlas automatically backs up data (M1+ tier)
   - Free tier: use `mongodump` or `mongoexport` for manual backups

3. **Scaling**:
   - If you exceed free tier limits, upgrade to M1 (paid)
   - Start with M1 if you expect heavy usage

## Troubleshooting

### Connection Refused
- Verify your IP is whitelisted in Network Access
- Check username and password in connection string
- Ensure MongoDB_URL is correctly set in `.env`

### Quota Exceeded
- Free tier has storage limits (~5GB storage + 5GB backup)
- Upgrade to M1 cluster for more capacity

### Slow Queries
- Create indexes on frequently queried fields
- Use MongoDB Atlas Performance Advisor (click on your cluster)

## Further Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Python Motor Driver](https://motor.readthedocs.io/)
- [MongoDB Query Language Reference](https://docs.mongodb.com/manual/reference/)

