const STORAGE_KEY = 'speakease_phrases';
const VOICE_SETTINGS_KEY = 'speakease_voice_settings';

const DEFAULT_VOICE_SETTINGS = {
    rate: 1,
    pitch: 1,
};

const generateId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `${timestamp}-${random}`;
};

export const getPhrases = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored
          ? JSON.parse(stored)
          : [];
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

export const getVoiceSettings = () => {
    try {
        const stored = localStorage.getItem(VOICE_SETTINGS_KEY);
        return stored
          ? JSON.parse(stored)
          : DEFAULT_VOICE_SETTINGS;
    } catch (error) {
        console.error('Error reading voice settings from localStorage:', error);
        return DEFAULT_VOICE_SETTINGS;
    }
};

export const saveVoiceSettings = (settings) => {
    try {
        localStorage.setItem(VOICE_SETTINGS_KEY, JSON.stringify(settings));
        return settings;
    } catch (error) {
        console.error('Error saving voice settings to localStorage:', error);
        return null;
    }
};
