import { Navbar } from "@/components/Navbar";
import { getUser } from "@/firebase/db";
import { onAuthStateChanged } from "@/firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Profile() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    useEffect(() => {
        onAuthStateChanged((user) => {
            if (user) {
                getUser(user.uid).then((userData) => {
                    console.log("userData: ",userData);
                    setUser(userData);
                });
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
