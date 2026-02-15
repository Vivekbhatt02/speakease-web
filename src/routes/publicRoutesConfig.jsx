import {SpeakPage} from "../components/speak/SpeakPage";
import {SavedPhrasesPage} from "../components/phrases/SavedPhrasesPage";

export default [
    {
        path: '/',
        name: 'Speak',
        element: <SpeakPage/>,
    },
    {
        path: '/saved',
        name: 'Saved Phrases',
        element: <SavedPhrasesPage/>,
    },
];
