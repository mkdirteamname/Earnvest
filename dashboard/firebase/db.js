import { db } from "./config.js";
import { getDoc, doc, setDoc } from "firebase/firestore";

export const getUser = async (uid) => {
    try {
        const userDoc = doc(db, "users", uid);
        const userSnap = await getDoc(userDoc);
        console.log("Get Doc triggered");
        console.log(userSnap.data());
        return userSnap.data();
    } catch (error) {
        return error;
    }
}

export const addFinData = async (uid, risk, amount, period) => {
    try {
        const userDoc = doc(db, "userfindata", uid);
        await setDoc(userDoc, {
            risk: risk,
            amount: amount,
            period: period
        });
        console.log("Fin Data triggered");
    } catch (error) {
       console.log(error); 
    }
}
