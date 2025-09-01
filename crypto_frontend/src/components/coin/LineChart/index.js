import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { mil_bil_convert } from "../../../functions/mil_bil_convert";

function LineChart({ chartData, priceParam, multiAxis }) {
  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      crypto1: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          callback: function (value) {
            if (priceParam === "prices") {
              return "$" + value.toLocaleString();
            } else if (priceParam === "market_caps") {
              return "$" + mil_bil_convert(value);
            } else if (priceParam === "total_volumes") {
              return mil_bil_convert(value);
            }
          },
        },
      },
      crypto2: {
        type: "linear",
        display: true,
        position: "right",
        ticks: {
          callback: function (value) {
            if (priceParam === "prices") {
              return "$" + value.toLocaleString();
            } else if (priceParam === "market_caps") {
              return "$" + mil_bil_convert(value);
            } else if (priceParam === "total_volumes") {
              return mil_bil_convert(value);
            }
          },
        },
      },
    },
  };
  if (
    !chartData ||
    !chartData.labels ||
    !chartData.datasets ||
    chartData.datasets.length === 0
  ) {
    return (
      <p className="fallback" style={{ padding: "0.5rem" }}>
        Loading chart...
      </p>
    );
  }
  return <Line data={chartData} options={options} />;
}

export default LineChart;
