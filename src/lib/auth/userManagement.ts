import { prisma } from '@/utils/prismaClient';
import { encryptPassword } from '@/lib/auth/encryption';

/**
 * Creates a new prisma database entry with the information provided.
 * This is the primary way to create a new user for easy notes.
 * The password is automatically hashed before saved in the database.
 * @param user_role The role the user should be assigned.
 * @param user_name The name the user should have.
 * @param user_password The password that should be used (will be hashed).
 * @returns The successfully created prisma user.
 */
export async function createUser(user_role: string, user_name: string, user_password: string) {
    const encryptedPassword = await encryptPassword(user_password);
    const createdUser = await prisma.user.create({
        data: {
            user_role: user_role,
            user_name: user_name,
            user_password: encryptedPassword
        }
    })
    return createdUser;
}

type DeleteUserArguments =
    | { user_id: number; user_name?: never }
    | { user_id?: never; user_name: string };

/**
 * Deletes a user from the database by using either a user_id or user_name.
 * @param identifier A user_id or user_name to delete by.
 * @returns The deleted prisma user.
 */
export async function deleteUser(identifier: DeleteUserArguments) {
    const { user_id, user_name } = identifier;

    const where = user_id ? { user_id } : { user_name };
    return await prisma.user.delete({ where });
}

/**
 * Changes the role of a user.
 * @param identifier A user_id or user_name to delete by.
 * @param user_role The new role of the user.
 * @returns The update prisma user.
 */
export async function changeUserRole(identifier: DeleteUserArguments, user_role: 'user' | 'admin') {
    const { user_id, user_name } = identifier;
    
    const where = user_id ? { user_id } : { user_name };
    return prisma.user.update({
        where,
        data: {
            user_role: user_role
        }
    })
}

/**
 * Changes the password of a user.
 * The password is automatically hashed before saved in the database.
 * @param identifier A user_id or user_name to delete by.
 * @param user_password The new password of the user.
 * @returns The update prisma user.
 */
export async function changeUserPassword(identifier: DeleteUserArguments, user_password: string) {
    const { user_id, user_name } = identifier;
    const encryptedPassword = await encryptPassword(user_password);
    
    const where = user_id ? { user_id } : { user_name };
    return prisma.user.update({
        where,
        data: {
            user_password: encryptedPassword
        }
    })
}

/**
 * Changes the user_name of a user.
 * @param identifier A user_id or user_name to delete by.
 * @param new_user_name The new user_name of the user.
 * @returns The update prisma user.
 */
export async function changeUserName(identifier: DeleteUserArguments, new_user_name: string) {
    const { user_id, user_name } = identifier;
    
    const where = user_id ? { user_id } : { user_name };
    return prisma.user.update({
        where,
        data: {
            user_name: new_user_name
        }
    })
}