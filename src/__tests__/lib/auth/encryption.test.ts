import { expect, test } from 'vitest';
import { encryptPassword, validatePassword } from '@/lib/auth/encryption';

const testPassword = "asdfasdfA12!";

test('Encrypt Password', async () => {
    const passwordHash = await encryptPassword(testPassword);

    expect(passwordHash).toBeTypeOf('string');
    expect(passwordHash).not.toEqual(testPassword);
    expect(passwordHash.length).toBeGreaterThan(testPassword.length);
})

test('Validate Password', async () => {
    const passwordHash = await encryptPassword(testPassword);
    const isPasswordValid = await validatePassword(testPassword, passwordHash);

    expect(isPasswordValid).toBe(true);
})