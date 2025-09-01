import React from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import "./styles.css";
import { color } from "framer-motion";
import Grid from "../Grid";
import List from "../List";
import Button from "../../common/Button";

export default function TabsComponent({ coins, clearSearch, search }) {
  const [value, setValue] = useState("grid");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if ((coins.length == 0 && search == 0) || !coins) {
    return <p className="fallback">Loading Coins...</p>;
  }

  if ((coins.length == 0 && search != 0) || !coins) {
    return (
      <div className="box-cont">
        <p className="fallback">Item Not Found</p>
        <div className="clear-box">
          <Button text="Clear Search" onClick={clearSearch} />
        </div>
      </div>
    );
  }

  const style = {
    color: "var(--white)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(100, 0, 214)",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <div>
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label="Grid" value="grid" sx={style} />
            <Tab label="List" value="list" sx={style} />
          </TabList>
        </div>
        <TabPanel value="grid">
          <div className="grid-coin">
            {coins.map((coin, i) => {
              return <Grid coin={coin} key={i} />;
            })}
          </div>
        </TabPanel>
        <TabPanel value="list">
          <table className="list-table">
            <tbody>
              {coins.map((item, i) => {
                return <List coin={item} key={i} />;
              })}
            </tbody>
          </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
