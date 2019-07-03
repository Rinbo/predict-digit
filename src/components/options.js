export const options = (xlabel, ylabel, maxY) => {
  const opts = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            color: "#cccccc"
          },
          scaleLabel: {
            display: false,
            labelString: xlabel
          }
        }
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            color: "rgba(204, 204, 204, 0.5)"
          },
          scaleLabel: {
            display: false,
            labelString: ylabel
          },
          ticks: {
            autoSkip: false,
            min: 0,
            max: maxY + (10 - (maxY % 10))
          }
        }
      ]
    },
    maintainAspectRatio: false
  };
  return opts;
};
