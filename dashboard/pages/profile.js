import { Navbar } from "@/components/Navbar";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "@/firebase/auth";
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                const docRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(docRef);
                setUserData(userSnap.data());
            }  
        });
    }, []);
    return (
        <>
            <Navbar />
        {user &&
            <div>
                <h1>Profile</h1>
                <div>
                    <h2>Email: {userData?.Email}</h2>
                    <h2>Username: {userData?.Username}</h2>
                </div>
            </div>
        }
        </>
    )
}
