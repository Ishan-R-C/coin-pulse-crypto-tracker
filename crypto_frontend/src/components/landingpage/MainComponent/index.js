import React from "react";
import "./styles.css";
import Button from "../../common/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function MainComponent() {
  const navigate = useNavigate();
  return (
    <div className="info">
      <div className="left-comp">
        <motion.h1
          className="markets"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          Markets Move{" "}
          <span className="fast" style={{ color: "var(--violet)" }}>
            Fast
          </span>
        </motion.h1>
        <motion.h1
          className="faster"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          We Move <span style={{ color: "var(--violet)" }}>Faster</span>
        </motion.h1>
        <motion.p
          className="desc"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.5 }}
        >
          Market data, breaking headlines, and asset insights — all synced in
          real time.
        </motion.p>
        <motion.div
          className="btn-flex"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.7 }}
        >
          <Button text="Dashboard" onClick={() => navigate("/dashboard")} />
          <Button
            text="Watchlist"
            outlined={true}
            onClick={() => navigate("/watchlist")}
          />
        </motion.div>
      </div>
      <motion.div
        className="right-comp"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </div>
  );
}

export default MainComponent;
