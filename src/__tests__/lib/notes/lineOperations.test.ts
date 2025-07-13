import { beforeEach, expect, test, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { mockReset, mockDeep } from 'vitest-mock-extended';
import type { DeepMockProxy } from 'vitest-mock-extended';
import { overrideLines } from '@/lib/notes/lineOperations';

vi.mock('@/utils/prismaClient', () => {
    const prisma = mockDeep<PrismaClient>();
    return { prisma };
});

import { prisma } from '@/utils/prismaClient';

const mockedPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
    mockReset(mockedPrisma);
})

test('Update Note Lines', async () => {
    const mockNote = {
        note_id: 1,
        note_lines: "Initial\nNote\nLines",
        note_author_id: 1
    }

    mockedPrisma.note.update.mockResolvedValue({
        note_id: 1,
        note_lines: "New Note\nLines",
        note_author_id: 1
    });

    const updatedNote = await overrideLines(
        ["New Note", "Lines"],
        mockNote.note_author_id
    );

    expect(updatedNote.note_lines).toBe('New Note\nLines');

    expect(prisma.note.update).toHaveBeenCalledWith({
        where: {
            note_id: mockNote.note_id
        },
        data: {
            note_lines: "New Note\nLines",
        }
    });
})