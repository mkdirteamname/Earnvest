import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "@/components/Navbar";
import axios from "axios";
import Papa from 'papaparse';
import fs from 'fs';
import { PieChart, Pie, Cell } from 'recharts';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "@/firebase/auth";
import { db } from "@/firebase/config";


export async function getServerSideProps(context) {
    const chart_data = fs.readFileSync('/home/manas/charts/new_stock.csv', 'utf8');
    const parsedData = Papa.parse(chart_data, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            console.log('Finished:', results.data);
        }

    }).data;

    return {
        props: {
            chart_data: parsedData
        },
    };
    }
function portfolio({chart_data}) {
    const router = useRouter();
    const { option } = router.query;
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [optimize, setOptimize] = useState({});
    const [user, setUser] = useState(null);
    const [userFinData, setUserFinData] = useState(null);
    const [statsSubmit, setStatsSubmit] = useState(false);

    useEffect(() => {
        onAuthStateChanged(async (user) => {
            setUser(user);
            const docRef = doc(db, "userfindata", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserFinData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }); 
    }, []);

    const handleStatsSubmit = async () => {
        if (statsSubmit) {
            return;
        }
    var amount=0, risk=0, time=0, exp_return=0, exp_amount=0;
        
        if (userFinData) {
        amount = userFinData.amount;
        risk = userFinData.risk;
        time = userFinData.period;
        exp_return = parseInt(optimize['expected_return']);
        exp_amount = amount * (1 + exp_return/100)**time;
        setStatsSubmit(true);
    }
    }

    const sectors = {};
    let sum = 0;
    chart_data.forEach(item => {
        if (!sectors[item.Sector]) {
            sectors[item.Sector] =  0;
        }
        sectors[item.Sector] += parseInt(item['Closing Price'])*parseInt(item['Quantity Held']);
        sum += parseInt(item['Closing Price'])*parseInt(item['Quantity Held']);
    });

    const getOptimal = async () => {
        const data = {
            start_date: '2024-01-01',
            end_date: '2024-02-16'
        }
        await axios.post('https://earnvest.render.com/optimize_portfolio', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                setOptimize(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const colors = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19FF19', '#1919FF', '#FF19FF', '#19FFFF',
        '#FF1919', '#19FF19', '#1919FF', '#FF19FF', '#19FFFF', '#FF1919', '#19FF19', '#1919FF', '#FF19FF', '#19FFFF',]

    return (
        <div>
        <Navbar />
        { option === "visuals" ? (
            <div className="flex flex-col items-center min-h-screen">
            <h1 className="text-4xl font-bold"a>Visuals</h1>
            <div className='bg-white p-4'>
            <PieChart width={400} height={400}>
            <Pie dataKey="value" 
            isAnimationActive={true} 
            data={Object.keys(sectors).map(key => ({name: key, value: sectors[key]}))} 
            cx="50%" 
            cy="50%" 
            outerRadius={80} 
            fill="#8884d8" 
            label={({ name, percent }) => `${name}: ${(percent *  100).toFixed(0)}%`}
            />
            {Object.keys(sectors).map((key, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
            </PieChart>
            <p className="text-center">Total Investment: INR {sum}</p>
            </div>
            </div>
        ) : option === "stats" ? (
            <div className="flex flex-col items-center min-h-screen">
            <p className="text-4xl font-bold">Statistics on your Portfolio</p>
            <label className="text-xl text-center p-4">Upload your CSV<input type="file" itemType="csv" className="p-4 text-center" /></label>
            <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-50%" onClick={handleStatsSubmit}>Submit</button>
            <p className="text-xl text-center p-4">Total Portfolio Size: INR {statsSubmit ? sum : 0}</p>
            <p className="text-xl text-center p-4">Total Number of Stocks: {statsSubmit ? chart_data.length : 0}</p>
            <p className="text-xl text-center p-4">Sectors allocated: {statsSubmit ? Object.keys(sectors).length : 0}</p>
            </div>
        ) : option === "optimal" ? (
            <div className="flex flex-col space-y-4 items-center justify-center">
            <p className="text-lg font-semibold mb-2">Optimal Portfolio Calculation</p>
            <p className="text-m font-semibold mb-2">Enter your start and end date of portfolio</p>
            <div className="flex space-x-4">
            <input
            type="date"
            value={startDate}
            onChange={(e) => {setStartDate(e.target.value)}}
            required
            className="border border-gray-300 p-2 rounded-md"
            />
            <input
            type="date"
            value={endDate}
            onChange={(e) => {setEndDate(e.target.value)}}
            required
            className="border border-gray-300 p-2 rounded-md"
            />
            </div>
            <button
            onClick={getOptimal}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-50%"
            >
            Submit
            </button>
            <div className="flex flex-col items-center justify-center">
            {optimize && optimize['weights'] && (
                <>
                <p className="text-m text-gray-600">
                Expected Return on Investment: {parseInt(optimize['expected_return']).toPrecision(4)}% YoY
                </p>
                <p className="text-m text-gray-600">
                Sharpe Ratio of Portfolio: {parseInt(optimize['sharpe_ratio']).toPrecision(4)} YoY
                </p>
                <div className="w-full max-w-xl p-4 mt-8 bg-white shadow-md rounded-md">
                <p>Suggested Optimal Portfolio based on Sharpe Ratio Analysis</p>
                {Object.entries(optimize['weights'])
                    .filter(([key, value]) => value !==  0)
                    .map(([key, value]) => (
                        <div key={key}>
                        <p>{key}: {value}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full max-w-xl p-4 mt-8 bg-white shadow-md rounded-md">
                <p>Expected Portfolio Value after {time} years</p>
                <p>Expected Portfolio Value: INR {exp_amount}</p>
                </div>
                </>
            )}
            </div>

            </div>

        ) : (
            <div>
            <p>Not Found</p>
            </div>
        )
            
        }
    </div>
    )
}

export default portfolio;
