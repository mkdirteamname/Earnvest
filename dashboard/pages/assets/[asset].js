import { Navbar } from "@/components/Navbar";
import Stocks from "@/components/Stocks";
import News from "@/components/News";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const stocks = ["CBOE", "AAPL", "NVDA"];

const getSharpe = async (stocks) => {
    const res = await axios.post("http://localhost:5000/stocks", {
        stocks: stocks
    });
    return res.data;
};

export default function Assets() {
  const router = useRouter();
    const { asset } = router.query;
    const [ticker, setTicker] = useState("");
    const [bonds, setBonds] = useState([]);
    const [tickerSharpe, setTickerSharpe] = useState([]);
    
    useEffect(() => {
        if (asset === "bonds") {
            getSharpe(stocks).then((data) => {
                setBonds(data);
            });
        }
        if (asset === "stocks") {
            const stock = ticker;
            getSharpe(stock).then((data) => {
                setTickerSharpe(data);
            });
        }
    }, [asset, ticker]);

  return (
        <div>
      <Navbar />
      {asset === "gold" ? (
        <div className="flex p-4 flex-col items-center justify-center min-h-screen bg-gray-100">
          <p className="text-4xl font-bold mb-4">Gold</p>
          <Stocks ticker="XAUUSD" />
          </div>
        ) : asset === "bonds" ? (
            <div className="flex p-4 flex-col items-center min-h-screen bg-gray-100">
                <p className="text-4xl font-bold mb-4">Bonds</p>
                <div className="flex flex-col items-center">
                    {bonds.map((bond, index) => (
                        <p className="text-2xl" key={index}>{stocks[index]}: {parseInt(bond).toPrecision(3)}</p>
                    ))}
                </div>
            </div>
            ) : asset === "stocks" ? (
            <div className="flex p-4 flex-col items-center justify-center min-h-screen bg-gray-100">
                <p className="text-4xl font-bold mb-4">Stocks</p>
                <label htmlFor="ticker">Enter Ticker</label>
                <input className="m-2" placeholder="AAPL" type="text" value={ticker} onChange={(event) => setTicker(event.currentTarget.value)} />Sharpe Ratio is : <p>{tickerSharpe}</p>
                <Stocks ticker={ticker} />
            </div>
            ) : asset === "mfs" ? (
            <div className="flex p-4 flex-col items-center justify-center min-h-screen bg-gray-100">
                <p className="text-4xl font-bold mb-4">Mutual Funds</p>
                <Stocks ticker="TVF2G" />
            </div>
            ) : asset === "news" ? ( 
            <div className="flex p-4 flex-col items-center justify-center min-h-screen bg-gray-100">
                <p className="text-4xl font-bold mb-4">News</p>
                <News />
            </div>
            )
          : (
            <div className="flex p-4 flex-col items-center justify-center min-h-screen bg-gray-100">
                <p className="text-4xl font-bold mb-4">404 Not Found</p>
            </div>
            )
      }
        </div>
  );
}
