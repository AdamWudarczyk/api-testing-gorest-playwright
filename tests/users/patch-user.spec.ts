import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';

type UserGender = 'male' | 'female';
type UserStatus = 'active' | 'inactive';

type CreateUserRequest = {
    name: string;
    gender: UserGender;
    email: string;
    status: UserStatus;
};

type PatchUserRequest = Partial<CreateUserRequest>;

type UserResponse = {
    id: number;
    name: string;
    gender: UserGender;
    email: string;
    status: UserStatus;
};

test('API-USER-04: Partial update user (PATCH /users/{id})', async ({ request }) => {
    const token = process.env.GOREST_TOKEN;
    expect(token, 'GOREST_TOKEN is not set').toBeTruthy();

    const createPayload: CreateUserRequest = {
        name: 'Patch Test User',
        gender: 'male',
        email: `patch_${Date.now()}@mail.com`,
        status: 'active'
    };

    const createResponse = await request.post(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: createPayload
    });
    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();
    const userId = createdUser.id;

    const patchPayload: PatchUserRequest = {
        status: 'inactive'
    };

    const patchResponse = await request.patch(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
        },
    });
    expect(getResponse.status()).toBe(200);

    const fetchedUser = await getResponse.json();

    expect(fetchedUser.status).toBe('inactive');
    expect(fetchedUser.name).toBe(createdUser.name);
    expect(fetchedUser.email).toBe(createdUser.email);
});
