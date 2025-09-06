import React, { useState } from "react";
import "./styles.css";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import { Link } from "react-router-dom";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

function Grid({ coin }) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));

  return (
    <Link to={`/coin/${coin.id}`}>
      <div
        className={`grid-box ${
          coin.price_change_percentage_24h < 0 && "grid-box-red"
        }`}
      >
        <div className="coin-data">
          <img src={coin.image} className="coin-icon" />
          <div className="icon-flex">
            <div className="name-symbol">
              <p className="coin-symb">{coin.symbol}</p>
              <p className="coin-name">{coin.name}</p>
            </div>
            <div
              className={`watchlist-icon ${
                coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
              }`}
              onClick={(e) => {
                if (watchlist?.includes(coin.id)) {
                  removeItemToWatchlist(e, coin.id, setIsCoinAdded);
                } else {
                  setIsCoinAdded(true);
                  saveItemToWatchlist(e, coin.id);
                }
              }}
            >
              {watchlist?.includes(coin.id) ? (
                <StarIcon />
              ) : (
                <StarOutlineIcon />
              )}
            </div>
          </div>
        </div>
        {coin.price_change_percentage_24h >= 0 ? (
          <div className="perc-info">
            <div className="perc">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="up-chip">
              <TrendingUpOutlinedIcon />
            </div>
          </div>
        ) : (
          <div className="perc-info">
            <div className="perc perc-red">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="down-chip">
              <TrendingDownOutlinedIcon />
            </div>
          </div>
        )}
        <div className="price-desc">
          <h3
            className="price grid-price"
            style={{
              color:
                coin.price_change_percentage_24h >= 0
                  ? "var(--green)"
                  : "var(--red)",
            }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
          <p className="market-info">
            Market Cap : ${coin.market_cap.toLocaleString()}
          </p>
          <p className="market-info">
            Volume : {coin.total_volume.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Grid;
