# Uber Clone Backend API Documentation

## User Endpoints

### POST /users/register
Register a new user account.

**Request**: fullname (firstname, lastname), email, password (min 6 chars)
**Response**: 201 Created with token and user object
**Errors**: 400 Bad Request (validation), 409 Conflict (duplicate email)

### POST /users/login
Authenticate a user.

**Request**: email, password
**Response**: 200 OK with token and user object
**Errors**: 400 Bad Request (validation), 401 Unauthorized (invalid credentials)

### GET /users/profile
Get authenticated user profile.

**Requirements**: Valid JWT token (cookie or Authorization header)
**Response**: 200 OK with user details
**Errors**: 401 Unauthorized (invalid/missing token)

### GET /users/logout
Logout and blacklist token.

**Requirements**: Valid JWT token
**Response**: 200 OK with logout message
**Errors**: 401 Unauthorized (invalid token)

---

## Captain Endpoints

### POST /captains/register
Register a new captain with vehicle details.

**Request**: fullname (firstname, lastname), email, password (min 6 chars), vehicle (color, plate, capacity, vehicleType: car/motorcycle/auto)
**Response**: 201 Created with token and captain object
**Errors**: 400 Bad Request (validation), 409 Conflict (duplicate email)

### POST /captains/login
Authenticate a captain.

**Request**: email, password
**Response**: 200 OK with token and captain object
**Errors**: 400 Bad Request (validation), 401 Unauthorized (invalid credentials)

### GET /captains/profile
Get authenticated captain profile.

**Requirements**: Valid JWT token
**Response**: 200 OK with captain details
**Errors**: 401 Unauthorized (invalid/missing token)

### GET /captains/logout
Logout and blacklist captain token.

**Requirements**: Valid JWT token
**Response**: 200 OK with logout message
**Errors**: 401 Unauthorized (invalid token)

---

## Authentication

All protected endpoints (profile, logout) require a valid JWT token provided via:
- Cookie named `token`
- Authorization header: `Authorization: Bearer <token>`

Tokens are verified against a blacklist. Logged-out tokens are rejected with 401 Unauthorized.

## Status Codes

- **200 OK**: Login, profile retrieval, logout successful
- **201 Created**: Registration successful
- **400 Bad Request**: Validation errors or missing required fields
- **401 Unauthorized**: Invalid/missing/blacklisted token
- **409 Conflict**: Duplicate email (alternative to 400)
- **500 Internal Server Error**: Server/database error
