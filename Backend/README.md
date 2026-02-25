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

## Maps

> Note: Suggestion endpoint is public (no auth). Coordinate and distance endpoints require auth.

### GET /maps/get-coordinates
- Query: ?address=<string> (min 3)
- Auth: required
- Response: 200 OK
  - { lat: number, lng: number }
- Handler: [`mapController.getAddressCoordinates`](Backend/controllers/maps.controller.js) → uses [`mapService.getAddressCoordinates`](Backend/services/maps.service.js)
- Route: [Backend/routes/maps.routes.js](Backend/routes/maps.routes.js)

### GET /maps/get-distance-time
- Query: ?origin=<string>&destination=<string> (min 3 each)
- Auth: required
- Response: 200 OK
  - { distance: number (meters), duration: number (seconds) }
- Handler: [`mapController.getDistanceAndTime`](Backend/controllers/maps.controller.js) → uses [`mapService.getDistanceAndTime`](Backend/services/maps.service.js)
- Route: [Backend/routes/maps.routes.js](Backend/routes/maps.routes.js)

### GET /maps/get-suggestions
- Query: ?input=<string> (min 2 recommended; route validates min 3)
- Auth: not required (public)
- Response: 200 OK
  - { success: true, suggestions: [ { description, place_id, structured_formatting } ] }
- Handler: [`mapController.getAutoCompleteSuggestions`](Backend/controllers/maps.controller.js)
- Route: [Backend/routes/maps.routes.js](Backend/routes/maps.routes.js)

---

## Rides

### POST /rides/create
- Purpose: Create a new ride request.
- Auth: required
- Body (JSON):
  - pickup: string (min 3)
  - destination: string (min 3)
  - vehicleType: "auto"|"car"|"motorcycle"
- The server associates the ride with the authenticated user (req.user._id).
- Response: 201 Created
  - ride object (contains otp, fare, status, distance/duration when available)
- Validation/handler: [`rideController.createRide`](Backend/controllers/ride.controller.js), route: [Backend/routes/ride.routes.js](Backend/routes/ride.routes.js) → [`rideService.createRide`](Backend/services/ride.service.js)

### GET /rides/get-fare
- Purpose: Estimate fare between pickup and destination.
- Auth: required
- Query: ?pickup=<string>&destination=<string> (route uses query validators)
- Response: 200 OK
  - { auto: number, car: number, motorcycle: number } — fares for each vehicle type
- Validation/handler: [`rideController.getFare`](Backend/controllers/ride.controller.js) (route: [Backend/routes/ride.routes.js](Backend/routes/ride.routes.js) → uses [`rideService.getFare`](Backend/services/ride.service.js))

---

## Error codes
- 200 OK — Success
- 201 Created — Resource created
- 400 Bad Request — Validation errors
- 401 Unauthorized — Missing/invalid/blacklisted token or auth failure
- 404 Not Found — Resource not found (e.g., geocode miss)
- 500 Internal Server Error — Server error

---

## Notes / Implementation pointers
- Token blacklist model: [Backend/models/blacklistToken.model.js](Backend/models/blacklistToken.model.js)
- User model/auth helpers: [Backend/models/user_model.js](Backend/models/user_model.js)
- Captain model/auth helpers: [Backend/models/captain.model.js](Backend/models/captain.model.js)
- Maps uses OpenStreetMap (Nominatim) and OSRM: see [Backend/services/maps.service.js](Backend/services/maps.service.js)
- Fare calculation: [`rideService.getFare`](Backend/services/ride.service.js)



## Status Codes

- **200 OK**: Login, profile retrieval, logout successful
- **201 Created**: Registration successful
- **400 Bad Request**: Validation errors or missing required fields
- **401 Unauthorized**: Invalid/missing/blacklisted token
- **409 Conflict**: Duplicate email (alternative to 400)
- **500 Internal Server Error**: Server/database error
