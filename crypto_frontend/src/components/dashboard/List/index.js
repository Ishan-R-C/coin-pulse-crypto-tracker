import React from "react";
import "./styles.css";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import Tooltip from "@mui/material/Tooltip";
import { mil_bil_convert } from "../../../functions/mil_bil_convert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useState } from "react";

function List({ coin }) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));
  const navigate = useNavigate();
  return (
    <tr
      className="row"
      onClick={() => navigate(`/coin/${coin.id}`)}
      style={{ cursor: "pointer" }}
    >
      <Tooltip title="Coin Logo" placement="bottom-start">
        <td className="coin-image">
          <img src={coin.image} className="coin-icon" />
        </td>
      </Tooltip>

      <Tooltip title="Coin Info" placement="bottom-start">
        <td className="price-info">
          <div className="name-symbol">
            <p className="coin-symb">{coin.symbol}</p>
            <p className="coin-name">{coin.name}</p>
          </div>
        </td>
      </Tooltip>

      <Tooltip title="Price Change In 24Hrs" placement="bottom-start">
        {coin.price_change_percentage_24h >= 0 ? (
          <td className="perc-info">
            <div className="perc list-perc">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="up-chip chips">
              <TrendingUpOutlinedIcon />
            </div>
          </td>
        ) : (
          <td className="perc-info">
            <div className="perc perc-red list-perc">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="down-chip chips">
              <TrendingDownOutlinedIcon />
            </div>
          </td>
        )}
      </Tooltip>

      <Tooltip title="Current Price">
        <td className="price-desc price-list">
          <h3
            className="price td-center-align list-price"
            style={{
              color:
                coin.price_change_percentage_24h >= 0
                  ? "var(--green)"
                  : "var(--red)",
            }}
          >
            ${coin.current_price?.toLocaleString()}
          </h3>
        </td>
      </Tooltip>

      <Tooltip title="Market Cap">
        <td className="market-cap">
          <p className="market-info td-right-align desktop-mrkt">
            ${coin.market_cap?.toLocaleString()}
          </p>
          <p className="market-info td-right-align mobile-mrkt">
            ${mil_bil_convert(coin.market_cap)}
          </p>
        </td>
      </Tooltip>

      <Tooltip title="Total Volume">
        <td className="total-vol">
          <p className="market-info td-right-align desktop-mrkt">
            {coin.total_volume?.toLocaleString()}
          </p>
          <p className="market-info td-right-align mobile-mrkt">
            {mil_bil_convert(coin.total_volume)}
          </p>
        </td>
      </Tooltip>
      <td
        className={`watchlist-icon ${
          coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
        } star-icon`}
        onClick={(e) => {
          if (watchlist.includes(coin.id)) {
            removeItemToWatchlist(e, coin.id, setIsCoinAdded);
          } else {
            setIsCoinAdded(true);
            saveItemToWatchlist(e, coin.id);
          }
        }}
      >
        {watchlist.includes(coin.id) ? <StarIcon /> : <StarOutlineIcon />}
      </td>
    </tr>
  );
}

export default List;
