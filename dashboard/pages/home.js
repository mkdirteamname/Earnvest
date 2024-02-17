import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "@/firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "@/firebase/config";

export default function Home() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                const docRef = doc(db, "users", user.uid);                
                const userSnap = await getDoc(docRef);
                console.log(userSnap.data());
                setUserData(userSnap.data());
            }
        });
    }, []);
    return (
        <>
            <Navbar />
            <div className="flex p-4 m-4">
                <h1 className="text-4xl font-bold">Hi {userData?.Username}!</h1>
            </div>
        </>
    )
}
