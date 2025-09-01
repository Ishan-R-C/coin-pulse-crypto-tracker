import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import "./styles.css";

export default function PriceType({ priceParam, handlePriceParamChange }) {
  return (
    <div className="toggle-button">
      <ToggleButtonGroup
        value={priceParam}
        exclusive
        onChange={handlePriceParamChange}
        sx={{
          "& .Mui-selected": {
            color: "var(--violet) !important",
          },
          borderColor: "var(--violet)",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid !important",
            borderColor: "unset",
            color: "var(--violet)",
          },
          "& .MuiToggleButton-standard": {
            color: "var(--violet)",
          },
        }}
      >
        <ToggleButton value="prices" className="tog-btn">
          Prices
        </ToggleButton>
        <ToggleButton value="market_caps" className="tog-btn">
          Market Cap
        </ToggleButton>
        <ToggleButton value="total_volumes" className="tog-btn">
          Total Volume
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
