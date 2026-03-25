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

test('API-USER-05: Delete user (DELETE /users/{id})', async ({ request }) => {
    const token = process.env.GOREST_TOKEN;
    expect(token, 'GOREST_TOKEN is not set').toBeTruthy();

    const createPayload: UserPayload = {
        name: 'User To Delete',
        gender: 'male',
        email: `delete_${Date.now()}@mail.com`,
        status: 'active'
    };

    const createResponse = await request.post(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            name: 'User To Delete',
            gender: 'male',
            email: `delete_${Date.now()}@mail.com`,
            status: 'active',
        },
    });

    expect(createResponse.status()).toBe(201);
    const createdUser: UserResponse = await createResponse.json();
    const userId = createdUser.id;

    const deleteResponse = await request.delete(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    expect(deleteResponse.status()).toBe(204);

    const getResponse = await request.get(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    expect(getResponse.status()).toBe(404);
});
