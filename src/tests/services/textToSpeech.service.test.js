import {describe, it, expect, vi, beforeEach} from 'vitest';
import {speak} from '../../services/textToSpeech.service';

describe('textToSpeech.service', () => {
    let mockSpeak;
    let mockUtterance;

    beforeEach(() => {
        mockUtterance = {};
        vi.stubGlobal('SpeechSynthesisUtterance', vi.fn(function () {
            return mockUtterance;
        }));
        mockSpeak = vi.fn();
        vi.stubGlobal('speechSynthesis', {speak: mockSpeak});
    });

    it('creates an utterance with the provided text', () => {
        speak('hello');
        expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('hello');
    });

    it('sets language to en-US', () => {
        speak('hello');
        expect(mockUtterance.language).toBe('en-US');
    });

    it('sets rate to 1', () => {
        speak('hello');
        expect(mockUtterance.rate).toBe(1);
    });

    it('calls speechSynthesis.speak with the utterance', () => {
        speak('hello');
        expect(mockSpeak).toHaveBeenCalledWith(mockUtterance);
    });
});
