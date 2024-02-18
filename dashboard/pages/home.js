import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "@/firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "@/firebase/config";
import Link from "next/link";

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
        <div className="flex flex-col p-4 m-4 text-center">
        <h1 className="text-4xl font-bold">Hi {userData?.Username}! Welcome to Earnvest.</h1>
        </div>
        <div><h1 class="flex flex-col space-y-4 text-center p-4 justify-center text-center text-xl font-bold">Know your Personality!</h1></div>
        <div>
        <h1></h1>
        </div>

        <div><h1 class="flex flex-col space-y-4 text-center p-4 justify-center text-center text-xl font-bold">Learn Finance</h1></div>
        <div class="flex flex-row mx-auto text-center justify-center text-center">

        <iframe width="33%" height="33%" src="https://www.youtube.com/embed/MHxsJGz0NXs" title="How to keep emotions out of your investment decisions" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <iframe width="33%" height="33%" src="https://www.youtube.com/embed/cYE-eY4uulk" title="The Psychology of Investment: Unravelling the Emotional Decisions that Drive Financial Success" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <iframe width="33%" height="33%" src="https://www.youtube.com/embed/EZJjQZp1fH0" title="The Financial Therapist: How To Keep Emotions Out of Investment Decisions #MakingBank #S8E1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

        <div className="flex flex-col space-y-4 p-4 text-center justify-center">
        <h1 className="text-xl font-bold">Gain Insights</h1>
        <Link className="text-black py-2 rounded hover:text-blue-600" href="/assets/news">Stay on Top with latest News</Link>
        </div>

        <div className="flex flex-col p-4 mx-auto text-center">
        <h1 className="text-xl font-bold">Visit your Profile</h1>
        <Link className="text-black py-2 rounded hover:text-blue-600 mt-2 text-center block" href="/profile">Profile</Link>
        </div>
        </>

    )
}
