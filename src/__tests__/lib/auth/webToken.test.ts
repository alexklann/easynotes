import { expect, test } from 'vitest';
import { createJSONWebToken } from '@/lib/auth/webToken';

const mockUser = {
    user_id: 1,
    user_role: "user",
    user_name: "mock_user",
    user_password: "123456"
};

test('Create JWT Token', () => {
    const JWToken = createJSONWebToken(mockUser.user_name, '1h');

    expect(JWToken).toBeDefined();
    expect(JWToken).toBeTypeOf('string');
})