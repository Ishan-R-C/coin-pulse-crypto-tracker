import { api } from "../api/client";

export const get100coins = () => {
  return api
    .get("/api/coins/markets")
    .then((response) => {
      console.log("100 coins API CALLED (backend)");
      console.log("API RESPONSE =>", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("ERROR => ", error);
      return [];
    });
};
