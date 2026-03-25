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

type UserResponse = {
    id: number;
    name: string;
    gender: UserGender;
    email: string;
    status: UserStatus;
};

test('API-USER-02: Get user by ID (GET /users/{id})', async ({ request }) => {
    const token = process.env.GOREST_TOKEN;
    expect(token, 'GOREST_TOKEN is not set').toBeTruthy();

    const createPayload: CreateUserRequest = {
        name: 'API Test User',
        gender: 'male',
        email: `apitest_${Date.now()}@mail.com`,
        status: 'active'
    };

    const createResponse = await request.post(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: createPayload
    });
    expect(createResponse.status()).toBe(201);


    const createdUser: UserResponse = await createResponse.json();
    const userId = createdUser.id;
    const getResponse = await request.get(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    expect(getResponse.status()).toBe(200);

    const userData = await getResponse.json();

    expect(userData.id).toBe(userId);
    expect(userData.name).toBe("API Test User");
    expect(userData).toHaveProperty("email");
    expect(userData.status).toBe("active");
});
