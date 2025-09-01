import { api } from "../api/client";

export const getCoinData = (id) => {
  return api
    .get(`/api/coins/${id}`)
    .then((response) => {
      console.log("CoinData API CALLED (backend)");
      return response.data;
    })
    .catch((error) => {
      console.log("ERROR => ", error);
      return null;
    });
};
