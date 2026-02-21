import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const registerUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user',
        createdAt: new Date(),
    });

    return user;
};

export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const logoutUser = async () => {
    return signOut(auth);
};

export const getCurrentUser = () => {
    return auth.currentUser;
};

export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

export const getUserRole = async (userId) => {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
        return userDoc.data().role;
    }
    return 'user';
};

export const setUserRole = async (userId, role) => {
    await setDoc(doc(db, 'users', userId), { role }, { merge: true });
};
