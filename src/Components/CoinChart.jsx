import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from "recharts";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinChart = ({ symbol }) => {
    const [histData, setHistData] = useState([]);
  
    useEffect(() => {
      const getCoinHist = async () => {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=30&api_key=${API_KEY}`
        );
        const json = await response.json();
        setHistData(json.Data.Data);
      };
      getCoinHist().catch(console.error);
    }, [symbol]);
  
    const cleanData = (data) => {
      return data.map((item) => ({
        time: new Date(item.time * 1000).toLocaleDateString("en-US"),
        'open price': item.open,
      })).reverse();
    };
  
    return (
      <div>
        <h2>30-Day Price Data for {symbol}</h2>
        <LineChart
          width={730}
          height={250}
          data={cleanData(histData)}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="open price" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  };
  
  export default CoinChart;