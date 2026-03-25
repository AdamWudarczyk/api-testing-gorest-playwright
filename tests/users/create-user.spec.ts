import { test, expect } from '@playwright/test';
import {checkEnv} from "../../helpers/env-check";

const BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = process.env.GOREST_TOKEN;

type CreateUserRequest = {
    name: string;
    gender: 'male' | 'female';
    email: string;
    status: 'active' | 'inactive';
};

type CreateUserResponse = {
    id: number;
    name: string;
    email: string;
    gender: 'male' | 'female';
    status: 'active' | 'inactive';
};

test.beforeAll(() => {
    checkEnv();
});

test.describe('GoREST API - Create User', () => {
    test('API-USER-01 - POST /users → create a new user', async ({ request }) => {
        const userData: CreateUserRequest = {
            name: 'Adam Tester1',
            gender: 'male',
            email: `adam_${Date.now()}@mail.com`,
            status: 'active'
        };
        const response = await request.post(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
            data: userData
        });

        expect(response.status()).toBe(201);
        const body: CreateUserResponse = await response.json();

        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('email');
        expect(body.name).toBe('Adam Tester1');
        expect(body.email).toBe(userData.email);
        expect(body.status).toBe('active');
    });
});