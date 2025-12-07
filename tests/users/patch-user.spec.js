import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = process.env.GOREST_TOKEN;

test('API-USER-04: Partial update user (PATCH /users/{id})', async ({ request }) => {

    const createResponse = await request.post(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        data: {
            name: 'Patch Test User',
            gender: 'male',
            email: `patch_${Date.now()}@mail.com`,
            status: 'active',
        },
    });
    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();
    const userId = createdUser.id;

    const patchResponse = await request.patch(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        data: {
            status: 'inactive',
        },
    });

    expect(patchResponse.status()).toBe(200);
    const patchedUser = await patchResponse.json();

    expect(patchedUser.id).toBe(userId);
    expect(patchedUser.status).toBe('inactive');
    expect(patchedUser.name).toBe(createdUser.name);
    expect(patchedUser.email).toBe(createdUser.email);

    const getResponse = await request.get(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
    expect(getResponse.status()).toBe(200);

    const fetchedUser = await getResponse.json();
    expect(fetchedUser.status).toBe('inactive');
    expect(fetchedUser.name).toBe(createdUser.name);
    expect(fetchedUser.email).toBe(createdUser.email);
});
