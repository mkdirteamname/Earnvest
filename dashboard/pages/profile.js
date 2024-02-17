import { Navbar } from "@/components/Navbar";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "@/firebase/auth";
import { useEffect, useState } from "react";
import { addFinData } from "@/firebase/db";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});
    const [userFinData, setUserFinData] = useState({});
    const [risk, setRisk] = useState(0);
    const [amount, setAmount] = useState(0);
    const [period, setPeriod] = useState(0);

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

    useEffect(() => {
        onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "userfindata", user.uid);
                const userSnap = await getDoc(docRef);
                setUserFinData(userSnap.data());
            }
        })
    }, []);

    return (
        <>
        <Navbar />
        {user && (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Profile</h1>
            <div className="w-full max-w-xl p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl mb-2">Email: {userData?.Email}</h2>
            <h2 className="text-2xl mb-2">Username: {userData?.Username}</h2>
            </div>
            <div className="w-full max-w-xl p-4 mt-8 bg-white shadow-md rounded-md">
            <h2 className="text-2xl mb-4">Enter your investment outlook</h2>
            <h3 className="text-xl mb-2">Risk: </h3>
            <input
            type="range"
            min="0"
            max="10"
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className="w-full mb-4"
            />
            <h3 className="text-xl mb-2">Amount: </h3>
            <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-4"
            />
            <h3 className="text-xl mb-2">Period: </h3>
            <input
            type="number"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full mb-4"
            />
            <button
            onClick={() => addFinData(user.uid, risk, amount, period)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
            Submit
            </button>
            </div>
            <div className="w-full max-w-xl p-4 mt-8 bg-white shadow-md rounded-md">
            <h2 className="text-2xl mb-4">Current Outlook</h2>
            <h3 className="text-xl mb-2">Risk: {userFinData?.risk}</h3>
            <h3 className="text-xl mb-2">Amount: {userFinData?.amount}</h3>
            <h3 className="text-xl mb-2">Period: {userFinData?.period}</h3>
            </div>
            </div>
        )}
        </>

    )
}
