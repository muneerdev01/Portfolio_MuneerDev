# API Testing & Examples

## Using cURL

### Health Check
```bash
curl -X GET "http://localhost:8000/health"
```

### Drug Search
```bash
curl -X GET "http://localhost:8000/api/drugs/search/aspirin" \
  -H "Content-Type: application/json"
```

### Drug Info by RxCUI
```bash
curl -X GET "http://localhost:8000/api/drugs/info/198440" \
  -H "Content-Type: application/json"
```

### Check Drug Interaction
```bash
curl -X POST "http://localhost:8000/api/drugs/check-interaction" \
  -H "Content-Type: application/json" \
  -d '{
    "drug1": "Warfarin",
    "drug2": "Aspirin"
  }'
```

### Submit Contact Form
```bash
curl -X POST "http://localhost:8000/api/contact/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Partnership Inquiry",
    "message": "I am interested in your healthcare automation services and would like to discuss a potential project."
  }'
```

## Using HTTPie

### Health Check
```bash
http GET localhost:8000/health
```

### Drug Search
```bash
http GET localhost:8000/api/drugs/search/aspirin
```

### Check Interaction
```bash
http POST localhost:8000/api/drugs/check-interaction \
  drug1=Warfarin \
  drug2=Aspirin
```

### Submit Contact (Pretty JSON)
```bash
http POST localhost:8000/api/contact/submit \
  name="Jane Smith" \
  email="jane@example.com" \
  subject="Project Consultation" \
  message="I have a healthcare tech project and need your expertise."
```

## Using Postman

### 1. Create New Request
- Method: POST
- URL: `http://localhost:8000/api/contact/submit`

### 2. Headers
```
Content-Type: application/json
```

### 3. Body (raw JSON)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Automation Project",
  "message": "I need help building a pharmacy automation system."
}
```

## Using Python

```python
import requests
import json

BASE_URL = "http://localhost:8000"

# Health check
response = requests.get(f"{BASE_URL}/health")
print(response.json())

# Search for drug
drug_name = "aspirin"
response = requests.get(f"{BASE_URL}/api/drugs/search/{drug_name}")
print(json.dumps(response.json(), indent=2))

# Check interaction
interaction_data = {
    "drug1": "Warfarin",
    "drug2": "Aspirin"
}
response = requests.post(
    f"{BASE_URL}/api/drugs/check-interaction",
    json=interaction_data
)
print(json.dumps(response.json(), indent=2))

# Submit contact form
contact_data = {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Partnership Inquiry",
    "message": "I'm interested in your services for healthcare automation."
}
response = requests.post(
    f"{BASE_URL}/api/contact/submit",
    json=contact_data
)
print(json.dumps(response.json(), indent=2))
```

## Using JavaScript/Fetch

```javascript
const BASE_URL = 'http://localhost:8000';

// Health check
fetch(`${BASE_URL}/health`)
  .then(res => res.json())
  .then(data => console.log(data));

// Search drug
fetch(`${BASE_URL}/api/drugs/search/aspirin`)
  .then(res => res.json())
  .then(data => console.log(data));

// Check interaction
fetch(`${BASE_URL}/api/drugs/check-interaction`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    drug1: 'Warfarin',
    drug2: 'Aspirin'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Submit contact form
fetch(`${BASE_URL}/api/contact/submit`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Partnership Inquiry',
    message: 'I am interested in your services.'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Example Responses

### Drug Search Success
```json
{
  "rxcui": "5640",
  "name": "Aspirin",
  "strength": "500 mg",
  "form": "Tablet",
  "ingredients": ["Aspirin"]
}
```

### Drug Interaction - Major
```json
{
  "drug1": "Warfarin",
  "drug2": "Aspirin",
  "severity": "major",
  "description": "Increased risk of bleeding when combined with anticoagulants",
  "affected_systems": ["Hematologic", "Cardiovascular"],
  "clinical_significance": "May require dose adjustment or monitoring"
}
```

### Drug Interaction - None Found
```json
{
  "drug1": "Ibuprofen",
  "drug2": "Acetaminophen",
  "severity": "none",
  "description": "No known interactions found between these drugs.",
  "affected_systems": [],
  "clinical_significance": "Safe to use together based on current data."
}
```

### Contact Form Success
```json
{
  "status": "success",
  "message": "Thank you! Your message has been received. We'll get back to you soon.",
  "timestamp": "2024-04-07T15:30:45.123456"
}
```

### Contact Form Error
```json
{
  "detail": [
    {
      "type": "value_error",
      "loc": ["body", "email"],
      "msg": "invalid email format",
      "input": "invalid-email"
    }
  ]
}
```

## Common Requests for Testing

### Test Complete Workflow

```bash
#!/bin/bash

echo "=== Testing MuneerDev Portfolio API ==="

echo -e "\n1. Health Check"
curl -s http://localhost:8000/health | jq .

echo -e "\n2. Search for Lisinopril"
curl -s http://localhost:8000/api/drugs/search/Lisinopril | jq .

echo -e "\n3. Check Interaction: Lisinopril + NSAID"
curl -s -X POST http://localhost:8000/api/drugs/check-interaction \
  -H "Content-Type: application/json" \
  -d '{"drug1": "Lisinopril", "drug2": "Ibuprofen"}' | jq .

echo -e "\n4. Submit Contact Form"
curl -s -X POST http://localhost:8000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "API Testing",
    "message": "Testing the drug interaction API and contact form."
  }' | jq .

echo -e "\n=== All tests completed ==="
```

Save as `test-api.sh` and run:
```bash
chmod +x test-api.sh
./test-api.sh
```

## API Documentation

Visit the interactive API docs:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

These pages are auto-generated from the FastAPI code and provide:
- Full endpoint documentation
- Request/response schemas
- Try-it-out functionality
- Example values

## Debugging

### Check Server Status
```bash
curl -v http://localhost:8000/health
```

### Test Database Connection
```bash
# From backend directory
source venv/bin/activate
python3 << 'EOF'
import asyncio
from app.database import connect_to_mongo

asyncio.run(connect_to_mongo())
print("✓ Database connected")
EOF
```

### View API Logs
```bash
# If running with uvicorn --reload
# Logs are printed to terminal

# If running with systemd
sudo journalctl -u fastapi -f
```

## Load Testing

### With Apache Bench
```bash
ab -n 1000 -c 10 http://localhost:8000/health
```

### With wrk
```bash
wrk -t4 -c100 -d30s http://localhost:8000/health
```

### With Apache JMeter
Create a test plan with:
- Thread Group: 100 users, ramp-up 10s
- HTTP Request: GET /health
- Run and view results

## Notes

- All timestamps are UTC in ISO 8601 format
- Email sending requires proper SMTP configuration
- RxNav API is public and requires no authentication
- CORS is enabled for localhost:3000
- Request timeout is 10 seconds
