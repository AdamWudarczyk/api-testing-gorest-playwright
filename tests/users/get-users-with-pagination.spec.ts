import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';

type UserGender = 'male' | 'female';
type UserStatus = 'active' | 'inactive';

type UserResponse = {
    id: number;
    name: string;
    gender: UserGender;
    email: string;
    status: UserStatus;
};

test('API-USER-10: Get users list with pagination returns paginated results', async ({ request }) => {
    const token = process.env.GOREST_TOKEN;
    expect(token, 'GOREST_TOKEN is not set').toBeTruthy();

    const perPage = 5;

    const response = await request.get(`${BASE_URL}/users?page=1&per_page=${perPage}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    expect(response.status()).toBe(200);

    const users: UserResponse[] = await response.json();

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users.length).toBeLessThanOrEqual(perPage);

    for (const user of users) {
        expect(user.id).toBeDefined();
        expect(user.name).toBeTruthy();
        expect(user.email).toContain('@');
        expect(['active', 'inactive']).toContain(user.status);
    }
});