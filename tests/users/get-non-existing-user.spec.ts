import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';

test('API-USER-08: Get non-existing user returns 404', async ({ request }) => {
    const token = process.env.GOREST_TOKEN;
    expect(token, 'GOREST_TOKEN is not set').toBeTruthy();

    const nonExistingUserId = 999999999;

    const response = await request.get(`${BASE_URL}/users/${nonExistingUserId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    expect(response.status()).toBe(404);
});