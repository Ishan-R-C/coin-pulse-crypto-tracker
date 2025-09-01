import axios from "axios";

export const get100coins = () => {
  const myCoins = axios
    .get("http://localhost:8000/api/coins/markets")
    .then((response) => {
      console.log("100 coins API CALLED (backend)");
      return response.data;
    })
    .catch((error) => {
      console.log("ERROR => ", error);
      return [];
    });
  return myCoins;
};
