import React from "react";
import "./styles.css";
import ImgMediaCard from "../Cards";

function NewsScroller({ articles }) {
  return (
    <div className="news-scroller">
      {articles.map((article, index) => {
        const desc = article.description?.slice(0, 350) || "";
        const lastChar = desc.slice(-1);
        const needsEllipsis = ![".", "?", "!"].includes(lastChar);
        return (
          <ImgMediaCard
            key={index}
            title={article.title}
            description={desc + (needsEllipsis ? "..." : "")}
            image={article.image}
            url={article.url}
          />
        );
      })}
    </div>
  );
}

export default NewsScroller;
