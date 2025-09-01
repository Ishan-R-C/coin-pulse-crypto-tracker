import React, { useState } from "react";
import "./styles.css";

function CoinInfo({ heading, desc }) {
  const [exp, setExp] = useState(false);

  const ShortDesc =
    desc.slice(0, 350) + "<span style='color:var(--grey)'> Read More...</span>";
  const LongDesc = desc + "<span style='color:var(--grey)'> Show Less</span>";

  return (
    <div className="coin-wrap">
      <h2 className="coin-head">{heading}</h2>
      {desc.length > 350 ? (
        <p
          onClick={() => setExp(!exp)}
          className="coin-desc"
          dangerouslySetInnerHTML={{ __html: !exp ? ShortDesc : LongDesc }}
        ></p>
      ) : (
        <p className="coin-desc">{desc}</p>
      )}
    </div>
  );
}

export default CoinInfo;
