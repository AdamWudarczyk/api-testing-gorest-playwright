import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = process.env.GOREST_TOKEN;

test.describe('GoREST API - Create User', () => {

    test('API-USER-01 - POST /users → create a new user', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
            data: {
                name: "Adam Tester1",
                gender: "male",
                email: `adam_${Date.now()}@mail.com`,
                status: "active"
            }
        });

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("email");
        expect(body.name).toBe("Adam Tester1");
    });
});