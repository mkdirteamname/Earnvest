import { Navbar } from "@/components/Navbar";
import Stocks from "@/components/Stocks";
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
        <div className="flex justify-center text-center">
          <p className="bold text-xl">Gold</p>
          <Stocks ticker="XAUUSD" />
          </div>
        ) : asset === "bonds" ? (
            <div>
                <p>Bonds</p>
                <Stocks ticker="US10Y" />
                <Stocks ticker="IN10Y" />
            </div>
            ) : asset === "stocks" ? (
            <div>
                <p>Stocks</p>
                <input type="text" value={ticker} onChange={(event) => setTicker(event.currentTarget.value)} />
                <Stocks ticker={ticker} />
            </div>
            ) : asset === "mfs" ? (
            <div>
                <p>Mutual Funds</p>
                <Stocks ticker="TVF2G" />
            </div>
            ) : (
            <div>
                <p>404 Not Found</p>
            </div>
            )
      }
        </div>
  );
}
