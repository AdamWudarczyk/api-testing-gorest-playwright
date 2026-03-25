import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';

type UserGender = 'male' | 'female';
type UserStatus = 'active' | 'inactive';

type CreateOrUpdateUserRequest = {
    name: string;
    gender: UserGender;
    email: string;
    status: UserStatus;
};

type UserResponse = {
    id: number;
    name: string;
    gender: UserGender;
    email: string;
    status: UserStatus;
};

test('API-USER-03: Update user (PUT /users/{id})', async ({ request }) => {
    const token = process.env.GOREST_TOKEN;
    expect(token, 'GOREST_TOKEN is not set').toBeTruthy();

    const createUserPayload: CreateOrUpdateUserRequest = {
        name: 'Initial User',
        gender: 'male',
        email: `put_${Date.now()}@mail.com`,
        status: 'active'
    };

    const create = await request.post(`${BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        data: createUserPayload
    });

    expect(create.status()).toBe(201);
    const user = await create.json();

    const updateUserPayload: CreateOrUpdateUserRequest = {
        name: 'Updated User Name',
        gender: 'male',
        email: user.email,
        status: 'inactive'
    };

    const put = await request.put(`${BASE_URL}/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: updateUserPayload
    });

    expect(put.status()).toBe(200);
    const updated = await put.json();

    expect(updated.id).toBe(user.id);
    expect(updated.name).toBe('Updated User Name');
    expect(updated.status).toBe('inactive');
    expect(updated.email).toBe(user.email);

    const fetchedResponse = await request.get(`${BASE_URL}/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    expect(fetchedResponse.status()).toBe(200);
    const fetched = await fetchedResponse.json();

    expect(fetched.name).toBe('Updated User Name');
    expect(fetched.status).toBe('inactive');
    expect(fetched.email).toBe(user.email);
});
