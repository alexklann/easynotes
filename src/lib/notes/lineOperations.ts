import { prisma } from "@/utils/prismaClient";

/**
 * Overrides the lines of a database note entry by note_id.
 * This is the primary way to update lines for a note of a user.
 * @param note_lines The lines to override the database entry with.
 * @param note_id The id of the note to override the lines for.
 * @returns The updated prisma note.
 */
export async function overrideLines(note_lines: string[], note_id: number) {
    const combinedLines = note_lines.join('\n');

    return await prisma.note.update({
        where: {
            note_id
        },
        data: {
            note_lines: combinedLines
        }
    })
}