# Users — Registration Endpoint (explanation only)

This document explains how the POST /users/register endpoint works without presenting any code examples. It describes the data the endpoint expects, the server's behavior, validation logic, and the possible responses.

Overview

When a client requests POST /users/register, the server attempts to create a new user account. The server will validate the provided data, hash the password, store the user in the database, and return an authentication token along with the newly-created user details (the password will not be included in the response).

Where this endpoint is mounted

The endpoint is exposed under the `/users` base path, so the full route is `/users/register`.

Expected request format

The server expects a JSON payload containing a `fullname` object, an `email` and a `password`.


Validation behavior

Before the controller handles the creation, `express-validator` checks the fields listed above. If any validation rule fails, the server responds with a 400 Bad Request and a list of validation error objects that indicate which parameter failed and provide a human-friendly message.

Successful registration behavior

If validation passes and the user is created successfully, the server performs the following:


Possible error responses

  - When validation fails for any field
  - **Content**:
```json
{
  "errors": [
    {
      "msg": "string",     // Error message
      "param": "string",   // Field that caused the error
      "location": "body"
    }
  ]
}
```

### Validation Rules

1. Email:
   - Must be a valid email format
   - Required field
   - Minimum 5 characters

2. First Name:
   - Required field
   - Minimum 3 characters

3. Password:
   - Required field
   - Minimum 6 characters

### Additional Information

# Users — Registration Endpoint (full explanation with examples)

This document fully describes the POST /users/register endpoint: what the server expects, how it validates and processes incoming requests, and the exact shape of successful and error responses. Examples include the JSON request payload, a curl invocation, and sample responses.

Purpose

Create a new user account, securely store credentials, and return an authentication token plus the created user's public details.

Where the endpoint is mounted

The route is available under `/users`, so the full path is `/users/register`.

Request expectations

The endpoint expects a JSON body with three top-level pieces of information:

- `fullname` — an object with `firstname` (required) and `lastname` (optional).
- `email` — the user's email address (required and must be unique in the database).
- `password` — the user's chosen password (required).

Field constraints and validation

- `fullname.firstname`: required string, minimum length 3 characters. This is validated with express-validator.
- `fullname.lastname`: optional string; if supplied it must be at least 3 characters long.
- `email`: required string, must be a valid email format. The database enforces uniqueness.
- `password`: required string, minimum length 6 characters.

Example request payload (JSON)

An example of a valid request body is:

{
  "fullname": { "firstname": "Alice", "lastname": "Johnson" },
  "email": "alice@example.com",
  "password": "S3cureP@ssw0rd"
}

Quick curl example (how to call the endpoint)

Use a POST request with Content-Type application/json to the server host and port where your backend runs. The example below shows how to call http://localhost:3000/users/register.

curl -X POST "http://localhost:3000/users/register" with a JSON body containing fullname, email and password.

Successful response

When the request is valid and the user is created successfully, the server returns HTTP 201 Created. The response includes a JWT token (for authentication) and the created user's public details. The password is never returned.

Example success response (shape)

{
  "token": "<jwt-token>",
  "user": {
    "_id": "<mongodb-object-id>",
    "fullname": { "firstname": "Alice", "lastname": "Johnson" },
    "email": "alice@example.com",
    "socketId": null
  }
}

Validation error responses

If express-validator finds any issues with the request body (for example, an invalid email or a too-short firstname/password), the endpoint returns HTTP 400 Bad Request. The body contains an array of validation error objects, each describing the parameter and the human-friendly message.

Example validation error response (shape)

{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "first name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" }
  ]
}

Duplicate email / unique constraint

If the provided email already exists in the database, the database will reject the insert with a duplicate-key error. The server should map that to a 400-level response (commonly 400 or 409), and the client will receive an error indicating the email is already registered.

Server errors

Unexpected failures (for example, database connection issues) will return HTTP 500 Internal Server Error. The response should include a short message and the server logs should contain a full stack trace for debugging.

Status code summary

- 201 Created — registration succeeded; token and user details returned.
- 400 Bad Request — validation failed or required fields missing.
- 409 Conflict (or 400) — email already exists (duplicate key).
- 500 Internal Server Error — unexpected server-side failure.

Implementation notes

- Password hashing: passwords are hashed using bcrypt before storing in the DB. The code calls a `hashPassword` helper that returns the bcrypt hash.
- Token generation: a JWT is generated upon successful registration; the token payload includes the user's identifier and email and is signed with `JWT_SECRET`.
- Validation: request validation is performed with `express-validator` on the route middleware before the controller executes.

How to interpret error messages

- Validation errors list which field failed and provides a message designed to guide the client to correct the input.
- Duplicate-key/database errors indicate uniqueness violations (email already registered).

Operational hints and troubleshooting

- Ensure `JWT_SECRET` is present in the environment for token generation.
- If you get duplicate-key errors when testing, try a different email or clear the users collection.
- Use the validation error array to display helpful form-level errors in a client application.

Next steps (optional additions)

- Provide a Postman collection or cURL commands for quick manual testing.
- Add an automated integration test (using a test framework such as Jest + Supertest) that verifies the registration flow: valid registration, validation failures, duplicate email handling.

If you'd like, I can now add the curl/Postman examples as copyable commands, or create an integration test that programmatically exercises the endpoint. Tell me which you'd prefer.

## User Login — POST /users/login

Purpose

Authenticate an existing user and return a JWT along with the user's public details. The login endpoint verifies the provided email and password, and issues a token when credentials are valid.

Where the endpoint is mounted

The route is available under `/users`, so the full path is `/users/login`.

Request expectations

The login endpoint expects a JSON body containing `email` and `password`.

- `email`: required string, must be a valid email format.
- `password`: required string, minimum length 6.

Example request payload (JSON)

{
  "email": "alice@example.com",
  "password": "S3cureP@ssw0rd"
}

How authentication works (implementation notes)

- The route uses `express-validator` middleware to validate input before the controller runs.
- The controller looks up the user by email and requests the password field explicitly (the password is stored with select: false by default in the model).
- The plaintext password from the request is compared to the stored hash using bcrypt via the model's `comparePassword` method. If the comparison succeeds, a JWT is generated and returned.

Quick curl example (how to call the endpoint)

curl -X POST "http://localhost:3000/users/login" with a JSON body containing email and password.

Successful response

When credentials are valid, the server returns HTTP 200 OK. The response includes a JWT token for subsequent authenticated requests and the authenticated user's public details.

Example success response (shape)

{
  "token": "<jwt-token>",
  "user": {
    "_id": "<mongodb-object-id>",
    "fullname": { "firstname": "Alice", "lastname": "Johnson" },
    "email": "alice@example.com",
    "socketId": null
  }
}

Error responses

- Validation failure: 400 Bad Request. The response contains an array of validation error objects describing which fields failed validation.
- Invalid credentials: 401 Unauthorized. Returned when the email is not found or the password comparison fails; the response should contain a clear message such as "Email or Password is Incorrect".
- Server/database error: 500 Internal Server Error.

Status code summary for login

- 200 OK — authentication succeeded, token and user returned.
- 400 Bad Request — validation failed (missing/invalid email or password).
- 401 Unauthorized — email not found or password mismatch.
- 500 Internal Server Error — unexpected server-side failure.

Troubleshooting hints for login

- If login always fails even with correct credentials, verify that the user row contains a hashed password and that `comparePassword` is using the correct bcrypt parameters.
- Ensure the login controller requests the password field when finding the user (for example, by selecting the password explicitly) because the model marks password with `select: false`.
- Confirm `JWT_SECRET` is set so tokens can be generated.

## User Profile — GET /users/profile

Purpose

Retrieve the authenticated user's profile information. This endpoint requires a valid JWT token and returns the authenticated user's full details (excluding the password).

Where the endpoint is mounted

The route is available under `/users`, so the full path is `/users/profile`.

Authentication requirement

This is a protected endpoint. A valid JWT token must be provided in one of two ways:

- As a cookie named `token` in the request.
- In the Authorization header as a Bearer token (format: Authorization: Bearer <token>).

The authentication middleware (`authUser`) validates the token, checks it against the blacklist, verifies the JWT signature, and retrieves the user before passing control to the controller.

Request expectations

The GET request has no request body. Only the JWT token is required (via cookie or header).

Example request (with token in Authorization header)

GET /users/profile
Authorization: Bearer <jwt-token>

Successful response

When the token is valid and the user is authenticated, the server returns HTTP 200 OK with the user's profile data.

Example success response (shape)

{
  "_id": "<mongodb-object-id>",
  "fullname": { "firstname": "Alice", "lastname": "Johnson" },
  "email": "alice@example.com",
  "socketId": null
}

Error responses

- Missing or invalid token: 401 Unauthorized. The response contains a message such as "Unauthorized User".
- Token is blacklisted (user logged out): 401 Unauthorized. The response contains a message such as "Logged out user - Unauthorized".
- Token signature verification fails: 401 Unauthorized.
- Server/database error: 500 Internal Server Error.

Status code summary for profile

- 200 OK — authentication succeeded, user profile returned.
- 401 Unauthorized — token missing, invalid, or blacklisted.
- 500 Internal Server Error — unexpected server-side failure.

Implementation notes

- The `authUser` middleware must run before this endpoint to populate `req.user`.
- The endpoint simply returns `req.user`, which was populated by the middleware after token verification.
- The password is never included in the response (the model's password field has `select: false`).

Troubleshooting hints for profile

- If you receive a 401 error, verify the token is valid and has not expired.
- Check that the token was not blacklisted (user did not log out).
- Ensure the Authorization header format is correct: "Bearer <token>".

---

## User Logout — GET /users/logout

Purpose

Log out the authenticated user by blacklisting the current JWT token, preventing further use of that token for authentication.

Where the endpoint is mounted

The route is available under `/users`, so the full path is `/users/logout`.

Authentication requirement

This is a protected endpoint. A valid JWT token must be provided in one of two ways:

- As a cookie named `token` in the request.
- In the Authorization header as a Bearer token (format: Authorization: Bearer <token>).

The authentication middleware validates the token before the logout controller runs.

Request expectations

The GET request has no request body. Only the JWT token is required (via cookie or header).

Example request (with token in Authorization header)

GET /users/logout
Authorization: Bearer <jwt-token>

How logout works (implementation notes)

- The authenticated user's token is extracted from either the cookie or the Authorization header.
- The token is added to the blacklist (stored in the `blackListToken` collection).
- The server clears the `token` cookie on the client side.
- A success message is returned to confirm logout.

Successful response

When logout succeeds, the server returns HTTP 200 OK and clears the token cookie.

Example success response (shape)

{
  "message": "Loged out"
}

Error responses

- Missing or invalid token: 401 Unauthorized. The response contains a message such as "Unauthorized User".
- Token is already blacklisted: The logout may still succeed (if the middleware allows it) and return 200.
- Server/database error: 500 Internal Server Error.

Status code summary for logout

- 200 OK — logout succeeded, token blacklisted and cookie cleared.
- 401 Unauthorized — token missing, invalid, or already blacklisted.
- 500 Internal Server Error — unexpected server-side failure (e.g., database write error).

Implementation notes

- The `authUser` middleware must run before this endpoint to verify the user is authenticated.
- The token is extracted from `req.cookies.token` or the Authorization header.
- The token is stored in the `blackListToken` collection to prevent reuse.
- The `token` cookie is cleared from the client to remove the stored token.

After logout

- The blacklisted token can no longer be used to access protected endpoints.
- The authentication middleware checks the blacklist and rejects blacklisted tokens with a 401 response.
- The client must discard or clear the token locally and obtain a new token by logging in again.

Troubleshooting hints for logout

- If you receive a 401 error, verify the token is still valid at the time of logout.
- Check that the Authorization header format is correct if using header-based authentication.
- If logout returns 200 but the token still works, verify the blacklist middleware is properly checking the `blackListToken` collection.
- Ensure `JWT_SECRET` and database connectivity are properly configured.