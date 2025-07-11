import { expect, test } from 'vitest';
import { useNoteStore } from '@/stores/noteStore';

test('Append Line', () => {
    const noteStore = useNoteStore.getState();
    noteStore.appendLine("Test Line");
    expect(useNoteStore.getState().lines).toEqual(["Test Line"]);
})

test('Set Lines', () => {
    const noteStore = useNoteStore.getState();
    noteStore.setLines(['Test Line 1', 'Test Line 2']);
    expect(useNoteStore.getState().lines).toEqual(['Test Line 1', 'Test Line 2']);
    noteStore.setLines([]);
    expect(useNoteStore.getState().lines).toEqual([]);
})