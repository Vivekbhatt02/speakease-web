import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {getPhrases, savePhrase, updatePhrase, deletePhrase} from '../../services/storage.service';

describe('storage.service', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('getPhrases', () => {
        it('initializes default phrases on first call', () => {
            const phrases = getPhrases();
            expect(phrases.length).toBeGreaterThan(0);
        });

        it('returns parsed phrases array from localStorage', () => {
            const mockPhrase = {id: '123', text: 'Hello', createdAt: 1000};
            localStorage.setItem('speakease_phrases', JSON.stringify([mockPhrase]));
            localStorage.setItem('speakease_initialized', 'true');

            const phrases = getPhrases();
            expect(phrases).toEqual([mockPhrase]);
        });

        it('handles JSON parse errors gracefully', () => {
            localStorage.setItem('speakease_phrases', 'invalid json');
            localStorage.setItem('speakease_initialized', 'true');
            const phrases = getPhrases();
            expect(phrases).toEqual([]);
        });
    });

    describe('savePhrase', () => {
        it('saves phrase to localStorage with generated ID', () => {
            const text = 'Hello, world!';
            const result = savePhrase(text);

            expect(result).toBeDefined();
            expect(result.id).toBeDefined();
            expect(result.text).toBe(text);
            expect(result.createdAt).toBeDefined();
        });

        it('adds phrase to existing phrases array', () => {
            const initialCount = getPhrases().length;
            const phrase1 = savePhrase('First phrase');
            const phrase2 = savePhrase('Second phrase');

            const phrases = getPhrases();
            expect(phrases).toHaveLength(initialCount + 2);
            expect(phrases[initialCount]).toEqual(phrase1);
            expect(phrases[initialCount + 1]).toEqual(phrase2);
        });

        it('returns the saved phrase object with correct properties', () => {
            const result = savePhrase('Test phrase');

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('text', 'Test phrase');
            expect(result).toHaveProperty('createdAt');
            expect(typeof result.id).toBe('string');
            expect(typeof result.createdAt).toBe('number');
        });
    });

    describe('updatePhrase', () => {
        it('updates phrase text by ID', () => {
            const phrase = savePhrase('Original text');
            const updated = updatePhrase(phrase.id, 'Updated text');

            expect(updated.text).toBe('Updated text');
            expect(getPhrases()).toContainEqual(updated);
        });

        it('returns null when phrase ID not found', () => {
            const result = updatePhrase('nonexistent-id', 'New text');
            expect(result).toBeNull();
        });

        it('preserves other phrases when updating', () => {
            const initialCount = getPhrases().length;
            const phrase1 = savePhrase('Phrase 1');
            const phrase2 = savePhrase('Phrase 2');

            updatePhrase(phrase1.id, 'Updated phrase 1');

            const phrases = getPhrases();
            expect(phrases).toHaveLength(initialCount + 2);
            expect(phrases[initialCount + 1]).toEqual(phrase2);
        });
    });

    describe('deletePhrase', () => {
        it('removes phrase by ID from localStorage', () => {
            const phrase = savePhrase('To delete');
            const success = deletePhrase(phrase.id);

            expect(success).toBe(true);
            const remaining = getPhrases();
            expect(remaining.find((p) => p.text === 'To delete')).toBeUndefined();
        });

        it('returns false when phrase ID not found', () => {
            const result = deletePhrase('nonexistent-id');
            expect(result).toBe(false);
        });

        it('returns true on successful deletion', () => {
            const phrase = savePhrase('Delete me');
            const result = deletePhrase(phrase.id);
            expect(result).toBe(true);
        });

        it('preserves other phrases when deleting', () => {
            const initialCount = getPhrases().length;
            const phrase1 = savePhrase('Keep this');
            const phrase2 = savePhrase('Delete this');

            deletePhrase(phrase2.id);

            const phrases = getPhrases();
            expect(phrases).toHaveLength(initialCount + 1);
            expect(phrases.find((p) => p.id === phrase1.id)).toEqual(phrase1);
            expect(phrases.find((p) => p.id === phrase2.id)).toBeUndefined();
        });
    });

    describe('default phrases initialization', () => {
        it('initializes default phrases on first getPhrases call', () => {
            const phrases = getPhrases();
            expect(phrases.length).toBeGreaterThan(0);
            expect(phrases[0]).toHaveProperty('id');
            expect(phrases[0]).toHaveProperty('text');
            expect(phrases[0]).toHaveProperty('createdAt');
            expect(phrases[0]).toHaveProperty('category');
        });

        it('does not re-initialize if already initialized', () => {
            const phrases1 = getPhrases();
            const initialLength = phrases1.length;

            // Add custom phrase
            savePhrase('My custom phrase');

            const phrases2 = getPhrases();
            expect(phrases2.length).toBe(initialLength + 1);
        });

        it('includes medical phrases', () => {
            const phrases = getPhrases();
            const medicalPhrase = phrases.find((p) => p.text.includes('medication'));
            expect(medicalPhrase).toBeDefined();
        });

        it('includes daily phrases', () => {
            const phrases = getPhrases();
            const dailyPhrase = phrases.find((p) => p.text === 'Thank you');
            expect(dailyPhrase).toBeDefined();
        });

        it('includes emergency phrases', () => {
            const phrases = getPhrases();
            const emergencyPhrase = phrases.find((p) => p.text.includes('911'));
            expect(emergencyPhrase).toBeDefined();
        });
    });

});

