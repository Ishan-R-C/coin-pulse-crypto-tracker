import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import AnchorTemporaryDrawer from "./drawer";
import Button from "../Button";

function Header() {
  return (
    <div className="navbar">
      <h1 className="logo">
        Coin<span style={{ color: "var(--violet)" }}>Pulse</span>
      </h1>
      <div className="links">
        <Link to="/">
          <p className="link">Home</p>
        </Link>
        <Link to="/compare">
          <p className="link">Compare</p>
        </Link>
        <Link to="/watchlist">
          <p className="link">Watchlist</p>
        </Link>
        <Link to="/dashboard">
          <Button
            text={"Dashboard"}
            onClick={() => console.log("Button Pressed")}
          />
        </Link>
      </div>
      <div className="resp_drawer">
        <AnchorTemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
