import { useEffect, useState } from "react";
import { get100coins } from "../functions/get100coins";
import Header from "../components/common/Header";
import TabsComponent from "../components/dashboard/Tabs";
import Button from "../components/common/Button";
import BackToTop from "../components/common/BackToTop";
import Footer from "../components/common/Footer";

function Watchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (watchlist) {
      getData();
    }
  }, []);

  const getData = async () => {
    const allCoins = await get100coins();
    if (allCoins) {
      setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
    }
  };

  return (
    <div>
      <Header />
      {watchlist?.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      )}
      <BackToTop />
      <Footer />
    </div>
  );
}

export default Watchlist;
