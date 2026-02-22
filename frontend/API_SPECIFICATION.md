# API Specification

## Auth Endpoints
- **POST /auth/register**: Register a new user
  - Body: `{ email, password, name, gender?, age?, dob? }`
- **POST /auth/login**: Login with email and password
  - Body: `{ email, password }`
- **GET /auth/me**: Get current user profile
  - Auth required

## User Assessment Endpoints
- **PATCH /auth/assessment**: Save user assessment data
  - Auth required
  - Body: `{ jobRole, city, workDuration, distance, jobType, salary, company }`
