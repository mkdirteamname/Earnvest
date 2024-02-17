import { db } from "./config.js";
import { getDoc, doc, setDoc } from "firebase/firestore";

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
