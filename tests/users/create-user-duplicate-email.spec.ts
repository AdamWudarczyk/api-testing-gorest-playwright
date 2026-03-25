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

type UserResponse = UserPayload & {
    id: number;
};

type ValidationError = {
    field: string;
    message: string;
};

test('API-USER-07: Create user with duplicate email returns 422', async ({ request }) => {
    const token = process.env.GOREST_TOKEN;
    expect(token, 'GOREST_TOKEN is not set').toBeTruthy();

    const email = `duplicate_${Date.now()}@mail.com`;

    const payload: UserPayload = {
        name: 'Duplicate User',
        gender: 'male',
        email,
        status: 'active'
    };

    const firstResponse = await request.post(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: payload
    });

    expect(firstResponse.status()).toBe(201);

    const createdUser: UserResponse = await firstResponse.json();
    expect(createdUser.email).toBe(email);

    const secondResponse = await request.post(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: payload
    });

    expect(secondResponse.status()).toBe(422);

    const errors: ValidationError[] = await secondResponse.json();

    expect(Array.isArray(errors)).toBe(true);
    expect(errors.some(error => error.field === 'email')).toBe(true);
});