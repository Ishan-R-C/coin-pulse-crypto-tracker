import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import SelectCoins from "../components/compare/SelectCoins";
import SelectDays from "../components/coin/SelectDays";
import { coinObject } from "../functions/convertObject";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import { settingChartData } from "../functions/settingChartData";
import { get100coins } from "../functions/get100coins";
import List from "../components/dashboard/List";
import CoinInfo from "../components/coin/CoinInfo";
import Loader from "../components/common/Loader";
import LineChart from "../components/coin/LineChart";
import PriceType from "../components/coin/PriceType";
import Footer from "../components/common/Footer";
import BackToTop from "../components/common/BackToTop";

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [days, setDays] = useState(30);
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [priceParam, setPriceParam] = useState("prices");
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [allCoins, setAllCoins] = useState([]);

  async function handleDaysChange(event) {
    setLoading(true);
    setDays(event.target.value);
    const prices1 = await getCoinPrices(
      crypto1,
      event.target.value,
      priceParam
    );
    const prices2 = await getCoinPrices(
      crypto2,
      event.target.value,
      priceParam
    );
    settingChartData(setChartData, prices1, prices2);
    setLoading(false);
  }

  const handlePriceParamChange = async (event, newType) => {
    setLoading(true);
    setPriceParam(newType);
    const prices1 = await getCoinPrices(crypto1, days, newType);
    const prices2 = await getCoinPrices(crypto2, days, newType);
    settingChartData(setChartData, prices1, prices2);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const coins = await get100coins();
    if (coins) {
      setAllCoins(coins);
      const data1 = await getCoinData(crypto1);
      if (data1) {
        const data2 = await getCoinData(crypto2);
        coinObject(setCrypto1Data, data1);
        if (data2) {
          coinObject(setCrypto2Data, data2);
          const prices1 = await getCoinPrices(crypto1, days, priceParam);
          const prices2 = await getCoinPrices(crypto2, days, priceParam);
          settingChartData(setChartData, prices1, prices2);
          setLoading(false);
        }
      }
    }
  }

  const handleCoinChange = async (event, isCoin2) => {
    setLoading(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      const data = await getCoinData(event.target.value);
      if (data) {
        coinObject(setCrypto2Data, data);
        const prices1 = await getCoinPrices(crypto1, days, priceParam);
        const prices2 = await getCoinPrices(crypto2, days, priceParam);
        if (prices1.length > 0 && prices2.length > 0) {
          settingChartData(setChartData, prices1, prices2);
          setLoading(false);
        }
      }
    } else {
      setCrypto1(event.target.value);
      const data = await getCoinData(event.target.value);
      if (data) {
        coinObject(setCrypto1Data, data);
        const prices1 = await getCoinPrices(crypto1, days, priceParam);
        const prices2 = await getCoinPrices(crypto2, days, priceParam);
        if (prices1.length > 0 && prices2.length > 0) {
          settingChartData(setChartData, prices1, prices2);
          setLoading(false);
        }
      }
    }
  };

  return (
    <div>
      <Header />
      {loading || !crypto1Data?.id || !crypto2Data?.id ? (
        <Loader />
      ) : (
        <>
          <div className="day-coin-wrap">
            <SelectCoins
              allCoins={allCoins}
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
            />
          </div>
          <div className="coin-wrap">
            <List coin={crypto1Data} />
          </div>
          <div className="coin-wrap">
            <List coin={crypto2Data} />
          </div>
          <div
            className="coin-wrap"
            style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
          >
            <PriceType
              priceParam={priceParam}
              handlePriceParamChange={handlePriceParamChange}
            />
            <LineChart
              chartData={chartData}
              priceParam={priceParam}
              multiAxis={true}
            />
          </div>
          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
      <BackToTop />
      <Footer />
    </div>
  );
}

export default ComparePage;
