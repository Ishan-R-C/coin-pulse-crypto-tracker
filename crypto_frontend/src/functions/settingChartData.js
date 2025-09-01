import { convertDate } from "./convertDate";

export const settingChartData = (setChartData, prices1, prices2) => {
  if (prices2) {
    setChartData({
      labels: prices1?.map((price) => convertDate(price[0])),
      datasets: [
        {
          label: "Crypto 1",
          data: prices1?.map((price) => price[1]),
          borderColor: "rgb(100, 0, 214)",
          borderWidth: 1,
          fill: false,
          tension: 0.25,
          pointRadius: 0,
          yAxisID: "crypto1",
        },
        {
          label: "Crypto 2",
          data: prices2?.map((price) => price[1]),
          borderColor: "rgba(214, 0, 203, 1)",
          borderWidth: 1,
          fill: false,
          tension: 0.25,
          pointRadius: 0,
          yAxisID: "crypto2",
        },
      ],
    });
  } else {
    setChartData({
      labels: prices1?.map((price) => convertDate(price[0])),
      datasets: [
        {
          label: "Crypto 1",
          data: prices1?.map((price) => price[1]),
          borderColor: "rgb(100, 0, 214)",
          borderWidth: 1,
          fill: true,
          tension: 0.25,
          backgroundColor: "rgb(100, 0, 214,0.1)",
          pointRadius: 0,
          yAxisID: "crypto1",
        },
      ],
    });
  }
};
