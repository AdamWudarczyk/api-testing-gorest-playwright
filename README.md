# GoREST API – Playwright Automated Tests
A complete API automation framework for the GoREST public REST API.

This project demonstrates:
1) CRUD testing

## Tech Stack:
- Playwright (API Testing)
- JavaScript (ES6)

## Endpoints covered:
  | ID          | Test Description              |
  |-------------|-------------------------------|
  | API-USER-01 | Create new user (POST /users) |
  | API-USER-02 | Get user by ID (GET /users/{id}) |
  | API-USER-03 | TBD                           |
  | API-USER-04 | TBD                           |

## Project Structure:
```
api-testing-gorest-playwright/
├── tests/
│ └── users/
│ └── create-user.spec.js               # Example test: POST /users
│
├── utils/                              # Helper functions (TBD)
│
├── playwright.config.js                # Global Playwright configuration
├── package.json                        # Project dependencies & scripts
├── package-lock.json
├── .gitignore                          # Ignored files (incl. .env)
├── .env                                # Environment variables (NOT committed)
└── README.md                           # Project documentation
```

## Prerequisites:
**Environment Variables**/
Create a .env file in the project root:
```GOREST_TOKEN=your_api_token_here```
(Ensure .env is excluded via .gitignore.)

## Run tests:
```bash
npm install
```
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