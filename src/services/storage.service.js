import {DEFAULT_PHRASES} from '../data/defaultPhrases.js';

const STORAGE_KEY = 'speakease_phrases';
const INITIALIZED_FLAG_KEY = 'speakease_initialized';

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const initializeDefaultPhrases = () => {
    if (localStorage.getItem(INITIALIZED_FLAG_KEY)) {
        return;
    }

    const phrases = [];
    Object.entries(DEFAULT_PHRASES).forEach(([category, items]) => {
        items.forEach((phrase) => {
            phrases.push({
                id: generateId(),
                text: phrase.text,
                category,
                createdAt: Date.now(),
            });
        });
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(phrases));
    localStorage.setItem(INITIALIZED_FLAG_KEY, 'true');
};

export const getPhrases = () => {
    initializeDefaultPhrases();

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading phrases from localStorage:', error);
        return [];
    }
};

export const savePhrase = (text) => {
    try {
        const phrases = getPhrases();
        const phrase = {
            id: generateId(),
            text,
            createdAt: Date.now(),
        };
        phrases.push(phrase);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(phrases));
        return phrase;
    } catch (error) {
        console.error('Error saving phrase to localStorage:', error);
        return null;
    }
};

export const updatePhrase = (id, newText) => {
    try {
        const phrases = getPhrases();
        const phrase = phrases.find((p) => p.id === id);

        if (!phrase) {
            return null;
        }

        phrase.text = newText;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(phrases));
        return phrase;
    } catch (error) {
        console.error('Error updating phrase in localStorage:', error);
        return null;
    }
};

export const deletePhrase = (id) => {
    try {
        const phrases = getPhrases();
        const initialLength = phrases.length;
        const filtered = phrases.filter((p) => p.id !== id);

        if (filtered.length === initialLength) {
            return false;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting phrase from localStorage:', error);
        return false;
    }
};
