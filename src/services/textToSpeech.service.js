export const speak = (text, config = {}) => {
    const {rate = 1, pitch = 1} = config;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.language = "en-US";
    utterance.rate = rate;
    utterance.pitch = pitch;
    window.speechSynthesis.speak(utterance);
};