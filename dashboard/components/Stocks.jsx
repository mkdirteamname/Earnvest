import React, { useEffect, useRef, useState, memo } from 'react';

function Stocks({ ticker }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "container_id": "tradingview-widget-container",
        "width": "100%",
        "height": "100%",
        "autosize": true,
        "symbol": "${ticker}",
        "interval": "D",
        "timezone": "exchange",
        "theme": "light",
        "style": "0",
        "withdateranges": true,
        "allow_symbol_change": true,
        "save_image": false,
        "details": false,
        "hotlist": false,
        "calendar": true
      }`;
    container.current.innerHTML = '';
    container.current.appendChild(script);
  }, [ticker]);

  return (
    <div className="flex justify-center h-screen w-screen" >
      <div className="flex justify-center" style={{ height: "50%", width: "80%" }} ref={container}></div>
    </div>
  );
}

export default memo(Stocks);
