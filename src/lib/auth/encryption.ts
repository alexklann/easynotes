import { hash, compare } from 'bcrypt';

/**
 * Encrypts a password to use for saving in a database.
 * @param password The password to encrypt.
 */
export async function encryptPassword(password: string): Promise<string> {
    return await hash(password, 10);
}

/**
 * Validates if a password matches a given password hash.
 * @param password The plain user password input.
 * @param passwordHash The password hash to compare against.
 * @returns True if the password matches the hash, else False.
 */
export async function validatePassword(password: string, passwordHash: string): Promise<boolean> {
    return await compare(password, passwordHash);
}