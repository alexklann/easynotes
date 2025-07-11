import { sign } from "jsonwebtoken";

/**
 * Creates and signs a JSON web token for use with validating logins.
 * @param user_name The username to sign the token with
 * @param expiresIn The amount of time this token is valid.
 * Use 1h for refresh token and 14d for login token.
 * @returns The signed JSON web token.
 */
export function createJSONWebToken(user_name: string, expiresIn: '1h' | '14d'): string {
    if (process.env.JWT_SIGN_KEY === undefined) {
        throw new Error("JWT_SIGN_KEY is not set in .env file!")
    }

    return sign({ user_name: user_name }, process.env.JWT_SIGN_KEY, {
        expiresIn: expiresIn
    });
}