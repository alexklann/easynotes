import { beforeEach, describe, expect, test, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { mockReset, mockDeep } from 'vitest-mock-extended';
import type { DeepMockProxy } from 'vitest-mock-extended';
import { changeUserName, changeUserPassword, changeUserRole, createUser, deleteUser } from '@/lib/auth/userManagement';

vi.mock('@/utils/prismaClient', () => {
    const prisma = mockDeep<PrismaClient>();
    return { prisma };
});

vi.mock('@/lib/auth/encryption', () => ({
    encryptPassword: vi.fn().mockResolvedValue('hashed-pw')
}));

import { prisma } from '@/utils/prismaClient';

const mockedPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
    mockReset(mockedPrisma);
})

test('Create User', async () => {
    const mockUser = {
        user_id: 1,
        user_role: "user",
        user_name: "mock_user",
        user_password: "hashed-pw"
    }

    mockedPrisma.user.create.mockResolvedValue(mockUser);

    const createdUser = await createUser(
        mockUser.user_role,
        mockUser.user_name,
        mockUser.user_password
    );

    expect(createdUser).toEqual(mockUser);

    expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
            user_role: mockUser.user_role,
            user_name: mockUser.user_name,
            user_password: mockUser.user_password
        }
    });
})

describe('Delete User', () => {
    test('Delete User By Id', async () => {
        const mockUser = {
            user_id: 1,
            user_role: "user",
            user_name: "mock_user",
            user_password: "hashed-pw"
        }

        mockedPrisma.user.delete.mockResolvedValue(mockUser);

        const deletedUser = await deleteUser({ user_id: mockUser.user_id });

        expect(deletedUser).toEqual(mockUser);
        expect(mockedPrisma.user.delete).toHaveBeenCalledWith({
            where: {
                user_id: mockUser.user_id
            }
        })
    })

    test('Delete User By User Name', async () => {
        const mockUser = {
            user_id: 1,
            user_role: "user",
            user_name: "mock_user",
            user_password: "hashed-pw"
        }

        mockedPrisma.user.delete.mockResolvedValue(mockUser);

        const deletedUser = await deleteUser({ user_name: mockUser.user_name });

        expect(deletedUser).toEqual(mockUser);
        expect(mockedPrisma.user.delete).toHaveBeenCalledWith({
            where: {
                user_name: mockUser.user_name
            }
        })
    })
})

describe('Change User Role', () => {
    test('Change User Role By Id', async () => {
        const mockUser = {
            user_id: 1,
            user_role: "user",
            user_name: "mock_user",
            user_password: "hashed-pw"
        }

        mockedPrisma.user.update.mockResolvedValue({ ...mockUser, user_role: 'admin'});

        const updatedUser = await changeUserRole({ user_id: mockUser.user_id }, 'admin');

        expect(updatedUser.user_role).toBe('admin');
        expect(mockedPrisma.user.update).toHaveBeenCalledWith({
            where: {
                user_id: mockUser.user_id
            },
            data: {
                user_role: 'admin'
            }
        })
    })

    test('Change User Role By User Name', async () => {
        const mockUser = {
            user_id: 1,
            user_role: "user",
            user_name: "mock_user",
            user_password: "hashed-pw"
        }

        mockedPrisma.user.update.mockResolvedValue({ ...mockUser, user_role: 'admin'});

        const updatedUser = await changeUserRole({ user_name: mockUser.user_name }, 'admin');

        expect(updatedUser.user_role).toBe('admin');
        expect(mockedPrisma.user.update).toHaveBeenCalledWith({
            where: {
                user_name: mockUser.user_name
            },
            data: {
                user_role: 'admin'
            }
        })
    })
})

describe('Change User Name', () => {
    test('Change User Name By Id', async () => {
        const mockUser = {
            user_id: 1,
            user_role: "user",
            user_name: "mock_user",
            user_password: "hashed-pw"
        }

        mockedPrisma.user.update.mockResolvedValue({ ...mockUser, user_name: 'user2'});

        const updatedUser = await changeUserName({ user_id: mockUser.user_id }, 'user2');

        expect(updatedUser.user_name).toBe('user2');
        expect(mockedPrisma.user.update).toHaveBeenCalledWith({
            where: {
                user_id: mockUser.user_id
            },
            data: {
                user_name: 'user2'
            }
        })
    })

    test('Change User Name By User Name', async () => {
        const mockUser = {
            user_id: 1,
            user_role: "user",
            user_name: "mock_user",
            user_password: "hashed-pw"
        }

        mockedPrisma.user.update.mockResolvedValue({ ...mockUser, user_name: 'user2'});

        const updatedUser = await changeUserName({ user_name: mockUser.user_name }, 'user2');

        expect(updatedUser.user_name).toBe('user2');
        expect(mockedPrisma.user.update).toHaveBeenCalledWith({
            where: {
                user_name: mockUser.user_name
            },
            data: {
                user_name: 'user2'
            }
        })
    })
})

describe('Change User Password', () => {
    test('Change User Password By Id', async () => {
        const mockUser = {
            user_id: 1,
            user_role: "user",
            user_name: "mock_user",
            user_password: "hashed-pw"
        }

        mockedPrisma.user.update.mockResolvedValue(mockUser);

        const updatedUser = await changeUserPassword({ user_id: mockUser.user_id }, 'hashed-pw2');

        expect(updatedUser).toEqual(mockUser);
        expect(mockedPrisma.user.update).toHaveBeenCalledWith({
            where: {
                user_id: mockUser.user_id
            },
            data: {
                user_password: 'hashed-pw'
            }
        })
    })

    test('Change User Password By User Name', async () => {
        const mockUser = {
            user_id: 1,
            user_role: "user",
            user_name: "mock_user",
            user_password: "hashed-pw"
        }

        mockedPrisma.user.update.mockResolvedValue(mockUser);

        const updatedUser = await changeUserPassword({ user_name: mockUser.user_name }, 'hashed-pw2');

        expect(updatedUser).toEqual(mockUser);
        expect(mockedPrisma.user.update).toHaveBeenCalledWith({
            where: {
                user_name: mockUser.user_name
            },
            data: {
                user_password: 'hashed-pw'
            }
        })
    })
})