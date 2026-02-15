import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import {getVoiceSettings, saveVoiceSettings} from '../../services/storage.service';

describe('voice settings storage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('getVoiceSettings', () => {
        it('returns default settings when localStorage is empty', () => {
            const settings = getVoiceSettings();
            expect(settings).toEqual({rate: 1, pitch: 1});
        });

        it('returns saved settings from localStorage', () => {
            const customSettings = {rate: 1.5, pitch: 0.8};
            localStorage.setItem('speakease_voice_settings', JSON.stringify(customSettings));

            const settings = getVoiceSettings();
            expect(settings).toEqual(customSettings);
        });

        it('handles JSON parse errors gracefully', () => {
            localStorage.setItem('speakease_voice_settings', 'invalid json');
            const settings = getVoiceSettings();
            expect(settings).toEqual({rate: 1, pitch: 1});
        });
    });

    describe('saveVoiceSettings', () => {
        it('saves settings to localStorage', () => {
            const settings = {rate: 1.2, pitch: 1.3};
            const result = saveVoiceSettings(settings);

            expect(result).toEqual(settings);
            const stored = JSON.parse(localStorage.getItem('speakease_voice_settings'));
            expect(stored).toEqual(settings);
        });

        it('overwrites existing settings', () => {
            saveVoiceSettings({rate: 1.0, pitch: 1.0});
            saveVoiceSettings({rate: 2.0, pitch: 0.5});

            const settings = getVoiceSettings();
            expect(settings).toEqual({rate: 2.0, pitch: 0.5});
        });

        it('persists settings across calls', () => {
            const settings1 = {rate: 1.5, pitch: 0.8};
            saveVoiceSettings(settings1);

            const retrievedSettings = getVoiceSettings();
            expect(retrievedSettings).toEqual(settings1);
        });
    });
});
