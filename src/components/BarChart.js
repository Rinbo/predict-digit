import React from "react";
import { Bar } from "react-chartjs-2";
import { options } from "./options";

const BarChart = ({ prediction }) => {
  return (
    <Bar
      data={{
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        datasets: [
          {
            label: "Probability",
            backgroundColor: "rgba(33,186,69,0.2)",
            borderColor: "rgba(33,186,69,1)",
            borderWidth: 1,
            defaultFontColor: "#cccccc",
            hoverBackgroundColor: "rgba(33,186,69,0.4)",
            hoverBorderColor: "rgba(33,186,69,1)",
            data: prediction.map(e => Math.floor(e * 100))
          }
        ]
      }}
      options={options(
        null,
        null,
        Math.max(...prediction.map(e => Math.floor(e * 100))) || 90
      )}
    />
  );
};

export default BarChart;
