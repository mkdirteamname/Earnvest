import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "@/components/Navbar";
import axios from "axios";

function portfolio() {
    const router = useRouter();
    const { option } = router.query;
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [optimize, setOptimize] = useState(null);

    const getOptimal = async () => {
        const data = {
            start_date: '2024-01-01',
            end_date: '2024-02-16'
        }
        axios.post('http://localhost:5000/optimize_portfolio', data, {
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

    return (
        <div>
        <Navbar />
        { option === "visuals" ? (
            <div>
                <p>Visuals</p>
            </div>
        ) : option === "stats" ? (
            <div>
                <p>Stats</p>
            </div>
        ) : option === "optimal" ? (
            <div>
                <p>Optimal</p>
                <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value)}} required></input>
                <input type="date" value={endDate} onChange={(e) => {setEndDate(e.target.value)}} required></input>
            <button onClick={getOptimal}>Submit</button>
            { optimize && 
                <p>{optimize?.weights}</p>
            }
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
