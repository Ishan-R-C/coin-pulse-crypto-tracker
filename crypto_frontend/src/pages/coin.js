import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import { coinObject } from "../functions/convertObject";
import List from "../components/dashboard/List";
import CoinInfo from "../components/coin/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import LineChart from "../components/coin/LineChart";
import { convertDate } from "../functions/convertDate";
import SelectDays from "../components/coin/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import PriceType from "../components/coin/PriceType";
import Loader from "../components/common/Loader";
import BackToTop from "../components/common/BackToTop";
import Footer from "../components/common/Footer";

function CoinPage() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [priceParam, setPriceParam] = useState("prices");
  const [loading, setLoading] = useState(false);

  const handlePriceParamChange = async (event, newType) => {
    setLoading(true);
    setPriceParam(newType);
    const prices = await getCoinPrices(id, days, newType);
    if (prices) {
      settingChartData(setChartData, prices);
      setLoading(false);
    }
  };

  const handleDaysChange = async (event) => {
    setLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, priceParam);
    if (prices) {
      settingChartData(setChartData, prices);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  async function getData() {
    setLoading(true);
    const data = await getCoinData(id);
    if (data) {
      coinObject(setCoinData, data);
      const prices = await getCoinPrices(id, days, priceParam);
      if (prices) {
        settingChartData(setChartData, prices);
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <Header />
      {!loading && coinData ? (
        <div>
          <div className="coin-wrap">
            <table className="coin-table">
              <tbody>
                <List coin={coinData} />
              </tbody>
            </table>
          </div>
          <div
            className="coin-wrap"
            style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
          >
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <PriceType
              priceParam={priceParam}
              handlePriceParamChange={handlePriceParamChange}
            />
            <LineChart chartData={chartData} priceParam={priceParam} />
          </div>
          <div className="coin-wrap">
            <CoinInfo heading={coinData.name} desc={coinData.desc} />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="fallback">Loading Coin Info...</h1>
          <Loader />
        </div>
      )}
      <BackToTop />
      <Footer />
    </div>
  );
}

export default CoinPage;
