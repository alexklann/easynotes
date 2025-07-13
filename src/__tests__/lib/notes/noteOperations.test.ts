import { beforeEach, describe, expect, test, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { mockReset, mockDeep } from 'vitest-mock-extended';
import type { DeepMockProxy } from 'vitest-mock-extended';
import { createNote } from '@/lib/notes/noteOperations';

vi.mock('@/utils/prismaClient', () => {
    const prisma = mockDeep<PrismaClient>();
    return { prisma };
});

import { prisma } from '@/utils/prismaClient';

const mockedPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
    mockReset(mockedPrisma);
})

describe('Create Note', () => {
    test('Create new note with initial value', async () => {
        const mockNote = {
            note_id: 1,
            note_lines: "Initial\nNote\nLines",
            note_author_id: 1
        }

        mockedPrisma.note.create.mockResolvedValue(mockNote);

        const createdNote = await createNote(
            mockNote.note_author_id,
            ["Initial", "Note", "Lines"],
        );

        expect(createdNote).toEqual(mockNote);

        expect(prisma.note.create).toHaveBeenCalledWith({
            data: {
                note_author_id: mockNote.note_author_id,
                note_lines: mockNote.note_lines
            }
        });
    })

    test('Create new note', async () => {
        const mockNote = {
            note_id: 1,
            note_lines: "",
            note_author_id: 1
        }

        mockedPrisma.note.create.mockResolvedValue(mockNote);

        const createdNote = await createNote(mockNote.note_author_id);

        expect(createdNote).toEqual(mockNote);

        expect(prisma.note.create).toHaveBeenCalledWith({
            data: {
                note_author_id: mockNote.note_author_id,
                note_lines: ""
            }
        });
    })
})