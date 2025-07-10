import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

type NoteState = {
    lines: string[]
    lastSynced: Date
    _hasHydrated: boolean
}

type NoteActions = {
    setLines: (lines: string[]) => void
    appendLine: (line: string) => void
    setHasHydrated: (hasHydrated: boolean) => void
}

export const useNoteStore = create<NoteState & NoteActions>()(
    immer(
        persist(
            (set) => ({
                lines: [],
                lastSynced: new Date(0),
                _hasHydrated: false,
                setLines: (lines: string[]) =>
                    set((state) => {
                        state.lines = lines;
                    }),
                appendLine: (line: string) =>
                    set((state) => {
                        state.lines.push(line);
                    }),
                setHasHydrated: (hasHydrated: boolean) =>
                    set((state) => {
                        state._hasHydrated = hasHydrated;
                    }),
            }),
            {
                name: "note-store",
                onRehydrateStorage: (state) => {
                    return () => state.setHasHydrated(true);
                }
            }
        )
    )
)