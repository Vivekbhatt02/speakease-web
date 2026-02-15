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

    it('accepts custom rate configuration', () => {
        speak('hello', {rate: 1.5});
        expect(mockUtterance.rate).toBe(1.5);
    });

    it('accepts custom pitch configuration', () => {
        speak('hello', {pitch: 0.8});
        expect(mockUtterance.pitch).toBe(0.8);
    });

    it('accepts both rate and pitch configuration', () => {
        speak('hello', {rate: 1.2, pitch: 1.3});
        expect(mockUtterance.rate).toBe(1.2);
        expect(mockUtterance.pitch).toBe(1.3);
    });

    it('uses default values when no config provided', () => {
        speak('hello');
        expect(mockUtterance.rate).toBe(1);
        expect(mockUtterance.pitch).toBe(1);
    });

    it('uses default values for missing config properties', () => {
        speak('hello', {rate: 1.5});
        expect(mockUtterance.rate).toBe(1.5);
        expect(mockUtterance.pitch).toBe(1);
    });
});
