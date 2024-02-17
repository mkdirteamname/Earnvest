import { Navbar } from "@/components/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Assets() {
  const router = useRouter();
    const { asset } = router.query;
    const [ticker, setTicker] = useState("");

  return (
        <div>
      <Navbar />
            <p>Asset : {asset}</p>
      {asset === "gold" ? (
        <div>
          <p>Gold</p>
          </div>
        ) : asset === "bonds" ? (
            <div>
                <p>Bonds</p>
            </div>
            ) : asset === "stocks" ? (
            <div>
                <p>Stocks</p>
                <input type="text" value={ticker} onChange={(event) => setEmail(event.currentTarget.value)} />
            </div>
            ) : asset === "mfs" ? (
            <div>
                <p>Mutual Funds</p>
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
