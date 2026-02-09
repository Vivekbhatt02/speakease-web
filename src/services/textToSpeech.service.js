export const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.language = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
};