import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  const { symbol } = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        const detailResponse = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`);
        const detailsJson = await detailResponse.json();

        const descriptionResponse = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`);
        const descripJson = await descriptionResponse.json();

        setFullDetails({
          numbers: detailsJson.DISPLAY[symbol].USD,
          textData: descripJson.Data[symbol]
        });
      } catch (error) {
        console.error("Failed to fetch coin details", error);
      }
    };

    getCoinDetail();
  }, [symbol]);

  if (!fullDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{fullDetails.textData.FullName}</h1>
      <img
        className="coin-image"
        src={`https://www.cryptocompare.com${fullDetails.numbers.IMAGEURL}`}
        alt={`Small icon for ${fullDetails.textData.FullName}`}
      />
      <div>{fullDetails.textData.Description}</div>
      <br />
      <div>
        This coin was built with the algorithm {fullDetails.textData.Algorithm}
      </div>
        <table>
          <tbody>
            <tr>
              <th>Launch Date:</th>
              <td>{fullDetails.textData.AssetLaunchDate || 'N/A'}</td>
            </tr>
            <tr>
              <th>Market:</th>
              <td>{fullDetails.numbers.MARKET || 'N/A'}</td>
            </tr>
            <tr>
              <th>Last Transaction:</th>
              <td>{fullDetails.numbers.LASTTRADEID || 'N/A'}</td>
            </tr>
            <tr>
              <th>Last Transaction Value:</th>
              <td>{fullDetails.numbers.LASTVOLUME || 'N/A'}</td>
            </tr>
            <tr>
              <th>Volume:</th>
              <td>{fullDetails.numbers.TOTALVOLUME24H || 'N/A'}</td>
            </tr>
            <tr>
              <th>Today's Open Price:</th>
              <td>{fullDetails.numbers.OPENDAY || 'N/A'}</td>
            </tr>
            <tr>
              <th>Highest Price During the Day:</th>
              <td>{fullDetails.numbers.HIGHDAY || 'N/A'}</td>
            </tr>
            <tr>
              <th>Lowest Price During the Day:</th>
              <td>{fullDetails.numbers.LOWDAY || 'N/A'}</td>
            </tr>
            <tr>
              <th>Change From Previous Day:</th>
              <td>{fullDetails.numbers.CHANGE24HOUR || 'N/A'}</td>
            </tr>
            <tr>
              <th>Market Cap:</th>
              <td>{fullDetails.numbers.MKTCAP || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
    </div>
  );
};

export default CoinDetail;