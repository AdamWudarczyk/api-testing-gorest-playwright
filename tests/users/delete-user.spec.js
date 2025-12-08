import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = process.env.GOREST_TOKEN;

test('API-USER-05: Delete user (DELETE /users/{id})', async ({ request }) => {
    const createResponse = await request.post(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        data: {
            name: 'User To Delete',
            gender: 'male',
            email: `delete_${Date.now()}@mail.com`,
            status: 'active',
        },
    });

    expect(createResponse.status()).toBe(201);
    const createdUser = await createResponse.json();
    const userId = createdUser.id;

    const deleteResponse = await request.delete(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
    expect(deleteResponse.status()).toBe(204);

    const getResponse = await request.get(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
    expect(getResponse.status()).toBe(404);
});
