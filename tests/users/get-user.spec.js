import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = process.env.GOREST_TOKEN;

test('API-USER-02: Get user by ID (GET /users/{id})', async ({ request }) => {

    const createResponse = await request.post(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        },
        data: {
            name: "API Test User",
            gender: "male",
            email: `apitest_${Date.now()}@mail.com`,
            status: "active"
        }
    });
    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();
    const userId = createdUser.id;

    const getResponse = await request.get(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });
    expect(getResponse.status()).toBe(200);

    const userData = await getResponse.json();
    expect(userData.id).toBe(userId);
    expect(userData.name).toBe("API Test User");
    expect(userData).toHaveProperty("email");
    expect(userData.status).toBe("active");
});
