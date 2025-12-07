import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = process.env.GOREST_TOKEN;

test('API-USER-03: Update user (PUT /users/{id})', async ({ request }) => {

    const createResponse = await request.post(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        },
        data: {
            name: "Initial User",
            gender: "male",
            email: `initial_${Date.now()}@mail.com`,
            status: "active"
        }
    });

    expect(createResponse.status()).toBe(201);
    const createdUser = await createResponse.json();
    const userId = createdUser.id;

    const updateResponse = await request.put(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        },
        data: {
            name: "Updated User Name",
            gender: "male",
            email: createdUser.email,
            status: "inactive"
        }
    });

    expect(updateResponse.status()).toBe(200);

    const updatedUser = await updateResponse.json();

    expect(updatedUser.id).toBe(userId);
    expect(updatedUser.name).toBe("Updated User Name");
    expect(updatedUser.status).toBe("inactive");
    expect(updatedUser.email).toBe(createdUser.email);

    const getResponse = await request.get(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });

    expect(getResponse.status()).toBe(200);
    const fetched = await getResponse.json();

    expect(fetched.name).toBe("Updated User Name");
    expect(fetched.status).toBe("inactive");
});
