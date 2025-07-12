import { describe, expect, test } from 'vitest';
import { createJSONWebToken } from '@/lib/auth/webToken';
import { afterEach } from 'node:test';

const mockUser = {
    user_id: 1,
    user_role: "user",
    user_name: "mock_user",
    user_password: "123456"
};

describe('Create JWT Token', () => {
    const ORIGINAL_JWT_SIGN_TOKEN = process.env.JWT_SIGN_TOKEN;

    afterEach(() => {
        process.env.JWT_SIGN_TOKEN = ORIGINAL_JWT_SIGN_TOKEN;
    })
    
    test('Creates a JWT Token', () => {
        const JWToken = createJSONWebToken(mockUser.user_name, '1h');

        expect(JWToken).toBeDefined();
        expect(JWToken).toBeTypeOf('string');
    })

    test('Test for error when no JWT_SIGN_KEY is set', () => {
        delete process.env.JWT_SIGN_KEY;

        expect(() => {
            createJSONWebToken(mockUser.user_name, '1h');
        }).toThrowError('JWT_SIGN_KEY is not set in .env file!')
    })
})