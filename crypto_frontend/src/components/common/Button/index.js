import React from "react";
import "./styles.css";
function Button({ text, onClick, outlined }) {
  return (
    <div
      className={outlined ? "outline-butn" : "butn"}
      onClick={() => onClick()}
    >
      {text}
    </div>
  );
}

export default Button;
