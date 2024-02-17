import { Navbar } from "@/components/Navbar";
import Stocks from "@/components/Stocks";
import News from "@/components/News";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Assets() {
  const router = useRouter();
    const { asset } = router.query;
    const [ticker, setTicker] = useState("");

  return (
        <div>
      <Navbar />
      {asset === "gold" ? (
        <div className="flex p-4 flex-col items-center justify-center min-h-screen bg-gray-100">
          <p className="text-4xl font-bold mb-4">Gold</p>
          <Stocks ticker="XAUUSD" />
          </div>
        ) : asset === "bonds" ? (
            <div className="flex p-4 flex-col items-center justify-center min-h-screen bg-gray-100">
                <p className="text-4xl font-bold mb-4">Bonds</p>
            </div>
            ) : asset === "stocks" ? (
            <div className="flex p-4 flex-col items-center justify-center min-h-screen bg-gray-100">
                <p className="text-4xl font-bold mb-4">Stocks</p>
                <label htmlFor="ticker">Enter Ticker</label>
                <input className="m-2" placeholder="AAPL" type="text" value={ticker} onChange={(event) => setTicker(event.currentTarget.value)} />
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
