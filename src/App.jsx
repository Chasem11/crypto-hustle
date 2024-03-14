import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from "./Components/CoinInfo";


function App() {
  const [list, setList] = useState(null);

  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  
  useEffect(() => {
    const fetchAllCoinData = async () => {
        try {
            const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY);
            const json = await response.json();
            setList(json);
        } catch (error) {
            console.error(error);
        }
    };
    fetchAllCoinData();
}, []);

  return (
  <div className="whole-page">
        <h1>My Crypto List</h1>
        <ul>
            {list && Object.entries(list.Data).map(([key, value]) =>
                value.PlatformType === "blockchain" ? (
                  <CoinInfo
                    key={value.FullName}
                    image={value.ImageUrl}
                    name={value.FullName}
                    symbol={value.Symbol}
                  />
                ) : null
            )}
        </ul>
    </div>
  )
}

export default App
