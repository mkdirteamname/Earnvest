import { auth } from "../firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
export const signup = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        });
        return user;
    } catch (error) {
        return error;
    }
    }

export const signin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        return error;
    }
    }

export const signout = async () => {
    try {
        await signOut();
    } catch (error) {
        return error;
    }
    }

export const onAuthStateChanged = (callback) => {
    return auth.onAuthStateChanged(callback);
}

export const signinWithGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        return user;
    } catch (error) {
        return error;
    }
    }
