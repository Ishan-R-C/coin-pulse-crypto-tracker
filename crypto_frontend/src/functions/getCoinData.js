import axios from "axios";

export const getCoinData = (id) => {
  const myData = axios
    .get(`http://localhost:8000/api/coins/${id}`)
    .then((response) => {
      if (response.data) {
        console.log("CoinData API CALLED (backend)");
        return response.data;
      }
    })
    .catch((error) => {
      console.log("ERROR => ", error);
    });
  return myData;
};
