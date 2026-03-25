import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';

type ValidationError = {
    field: string;
    message: string;
};

test('API-USER-09: Create user without email returns 422', async ({ request }) => {
    const token = process.env.GOREST_TOKEN;
    expect(token, 'GOREST_TOKEN is not set').toBeTruthy();

    const response = await request.post(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            name: 'Invalid Payload User',
            gender: 'male',
            status: 'active'
        }
    });

    expect(response.status()).toBe(422);

    const errors: ValidationError[] = await response.json();

    expect(Array.isArray(errors)).toBe(true);
    expect(errors.some(error => error.field === 'email')).toBe(true);
});