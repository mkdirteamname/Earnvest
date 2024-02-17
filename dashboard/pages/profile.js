import { Navbar } from "@/components/Navbar";
import { getUser } from "@/firebase/db";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "@/firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const router = useRouter();
    useEffect(() => {
        onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                console.log(user);
                const docRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(docRef);
                console.log("Get Doc triggered in Profile.js");
                console.log(userSnap.data());
                setUserData(userSnap.data());
            } else {
                router.push("/login");
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
                    <h2>Email: {user?.Email}</h2>
                    <h2>Username: {user?.Username}</h2>
                </div>
            </div>
        }
        </>
    )
}
