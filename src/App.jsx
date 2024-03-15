import { useState, useEffect } from 'react';
import './App.css';
import CoinInfo from "./Components/CoinInfo";

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const fetchAllCoinData = async () => {
        try {
            const response = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?&api_key=${API_KEY}`);
            const json = await response.json();
            setList(json);
        } catch (error) {
            console.error(error);
        }
    };

    fetchAllCoinData();
  }, [API_KEY]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "" && list) {
      const filteredData = Object.entries(list.Data).filter(([key, value]) =>
        value.FullName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.entries(list.Data || {}));
    }
  };

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      <ul>
        {searchInput.length > 0
          ? filteredResults.map(([key, value]) => 
              value.PlatformType === "blockchain" && (
                <CoinInfo
                  key={key}
                  image={value.ImageUrl}
                  name={value.FullName}
                  symbol={value.Symbol}
                />
              ))
          : list && Object.entries(list.Data).map(([key, value]) => 
              value.PlatformType === "blockchain" && (
                <CoinInfo
                  key={key}
                  image={value.ImageUrl}
                  name={value.FullName}
                  symbol={value.Symbol}
                />
              ))
        }
      </ul>
    </div>
  );
}

export default App;
