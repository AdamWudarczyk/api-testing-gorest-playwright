# GoREST API – Playwright Automated Tests
An automated API testing project for the GoREST public REST API, built with Playwright and TypeScript.

This project covers:
- CRUD operations for `/users`
- negative test scenarios
- authentication and validation checks
- pagination testing
- CI execution and reporting

## Tech Stack:
- Playwright (API Testing)
- Typescript
- OpenAPI / Swagger
- Allure
- GitHub Actions

## Endpoints covered:
  | ID          | Test Description                        |
  |-------------|-----------------------------------------|
  | API-USER-01 | Create new user (POST /users)           |
  | API-USER-02 | Get user by ID (GET /users/{id})        |
  | API-USER-03 | Update user (PUT /users/{id})           |
  | API-USER-04 | Partial update user (PATCH /users/{id}) |
  | API-USER-05 | Delete user (DELETE /users/{id}) |
  | API-USER-06 | Create user without token returns 401 (POST /users)    |
  | API-USER-07 | Create user with duplicate email returns 422 (POST /users) |
  | API-USER-08 | Get non-existing user returns 404 (GET /users/{id})     |
  | API-USER-09 | Create user without email returns 422 (POST /users) |
  | API-USER-10 | Get users list with pagination returns paginated results (GET /users) |
  


## Project Structure:
```
api-testing-gorest-playwright/
├── tests/
│ └── users/
│  ├── create-user.spec.ts                    # API-USER-01: Create user
│  ├──  get-user.spec.ts                      # API-USER-02: Get user by ID
│  ├── update-user.spec.ts                    # API-USER-03: Update user
│  ├── patch-user.spec.ts                     # API-USER-04: Partial update user
│  ├── delete-user.spec.ts                    # API-USER-05: Delete user
│  ├── create-user-without-token.spec.ts      # API-USER-06: Create user without token
│  ├── create-user-duplicate-email.spec.ts    # API-USER-07: Create user with duplicate email
│  ├── get-non-existing-user.spec.ts          # API-USER-08: Get non-existing user
│  ├── create-user-invalid-payload.spec.ts    # API-USER-09: Create user without email
│  └── get-users-with-pagination.spec.ts      # API-USER-10: Get users list with pagination
│
├── helpers/                                  # Helper functions 
│   └── env-check.ts                          # Environment variable validation
│
├── playwright.config.ts                      # Global Playwright configuration
├── package.json                              # Project dependencies & scripts
├── package-lock.json                         # Locked dependency versions
├── .gitignore                                # Ignored files (incl. .env)
├── .env                                      # Environment variables (NOT committed)
└── README.md                                 # Project documentation
```

## Prerequisites:
**Environment Variables**\
Create a .env file in the project root:\
```GOREST_TOKEN=your_api_token_here```
(Ensure .env is excluded via .gitignore.)\

## Run tests:
Install dependencies:
```bash
npm install
```
Run tests:
```bash
npx playwright test
```

## Allure Reports
This project includes Allure reporting for API tests.
Generate Allure report:

```bash
npm run allure:serve
```
The report will open automatically in the browser.


## Swagger Documentation
```bash
swagger-ui-watcher openapi.yaml
```
Open to check documentation: http://localhost:8000