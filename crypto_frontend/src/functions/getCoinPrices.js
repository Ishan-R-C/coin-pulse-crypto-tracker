import axios from "axios";

export const getCoinPrices = async (id, days = 7, priceParam = "prices") => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/coins/${id}/market_chart`,
      {
        params: { days, price_param: priceParam },
      }
    );
    console.log("CoinPrices API CALLED (backend)");
    return response.data;
  } catch (error) {
    console.error("ERROR => ", error);
    return [];
  }
};
