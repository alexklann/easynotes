import { beforeEach, expect, test } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { mockReset, mockDeep } from 'vitest-mock-extended';

const prisma = mockDeep<PrismaClient>();

beforeEach(() => {
    mockReset(prisma);
})

test('Create User', async () => {
    const mockUser = {
        user_id: 1,
        user_role: "user",
        user_name: "mock_user",
        user_password: "123456"
    }

    prisma.user.create.mockResolvedValue(mockUser);
    prisma.user.findUnique.mockResolvedValue(mockUser);

    const createdUser = await prisma.user.create({ data: mockUser });
    expect(createdUser).toEqual(mockUser);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: mockUser });
})