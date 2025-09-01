import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import TabsComponent from "../components/dashboard/Tabs";
import Search from "../components/dashboard/SearchBar";
import axios from "axios";
import PaginationComponent from "../components/dashboard/Pagination";
import NewsScroller from "../components/dashboard/NewsScroller";
import { color } from "framer-motion";
import BackToTop from "../components/common/BackToTop";
import { get100coins } from "../functions/get100coins";
import Loader from "../components/common/Loader";
import Footer from "../components/common/Footer";
const apikey = process.env.REACT_APP_GNEWS_API_KEY;

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [news, setNews] = useState([]);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const clearSearch = () => {
    setSearch("");
    setPage(1);
  };
  var filteredCoins = (coins || []).filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol?.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedCoins = filteredCoins.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    getData();
    axios
      .get(
        `https://gnews.io/api/v4/search?q=crypto&lang=en&max=10&apikey=${apikey}`
      )
      .then((response) => {
        console.log("GNews RESPONSE => ", response);
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.log("GNews ERROR => ", error);
      });
  }, []);

  const getData = async () => {
    setLoading(true);
    const myCoins = await get100coins();
    setCoins(myCoins);
    if (myCoins && myCoins.length >= 0) {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Search search={search} onSearchChange={onSearchChange} />
          {paginatedCoins.length > 0 && (
            <TabsComponent
              coins={paginatedCoins}
              clearSearch={clearSearch}
              search={search}
            />
          )}
          {filteredCoins.length > itemsPerPage && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
              count={Math.ceil(filteredCoins.length / itemsPerPage)}
            />
          )}
        </>
      )}
      <div className="scroller">
        <h1 style={{ color: "var(--white)", paddingLeft: "2rem" }}>
          Trending <span style={{ color: "var(--violet)" }}>News</span>
        </h1>
        <NewsScroller articles={news} />
      </div>
      <BackToTop />
      <Footer />
    </div>
  );
}

export default DashboardPage;
