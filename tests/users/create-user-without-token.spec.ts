import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';

type UserGender = 'male' | 'female';
type UserStatus = 'active' | 'inactive';

type UserPayload = {
    name: string;
    gender: UserGender;
    email: string;
    status: UserStatus;
};

test('API-USER-06: Create user without token returns 401', async ({ request }) => {
    const payload: UserPayload = {
        name: 'Unauthorized User',
        gender: 'male',
        email: `unauth_${Date.now()}@mail.com`,
        status: 'active'
    };

    const response = await request.post(`${BASE_URL}/users`, {
        data: payload
    });

    expect(response.status()).toBe(401);

    const body = await response.text();
    expect(body.toLowerCase()).toContain('authentication');
});