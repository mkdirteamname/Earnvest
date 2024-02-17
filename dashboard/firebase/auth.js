import { auth, db } from "./config.js";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
export const signup = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("userCredential: ",userCredential);
        console.log("userCredential.user: ",userCredential.user);
        if(userCredential && userCredential.user){
            const docRef = doc(db, "users", userCredential.user.uid);
           await setDoc(docRef, {
                Email: email,
                Username: username,
            });
        }
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

export async function signout() {
    try {
            console.log("Signing out");
            return auth.signOut();
    } catch (error) {
            console.error("Error signing out with Google", error);
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
