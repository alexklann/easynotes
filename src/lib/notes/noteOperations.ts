import { prisma } from "@/utils/prismaClient";

/**
 * Creates a note for a specified user.
 * This is the primary way to create a new note for a user.
 * @param note_author_id The user to create a note for.
 * @param note_lines The lines of text to write.
 * @returns The created prisma note.
 */
export async function createNote(note_author_id: number, note_lines: string[] = []) {
    const combinedLines = note_lines.join('\n');

    return await prisma.note.create({
        data: {
            note_lines: combinedLines,
            note_author_id: note_author_id
        }
    });
}