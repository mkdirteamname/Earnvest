import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const getUser = async (uid) => {
    try {
        const userDoc = doc(db, "users", uid);
        const userSnap = await getDoc(userDoc);
        return userSnap.data();
    } catch (error) {
        return error;
    }
}
