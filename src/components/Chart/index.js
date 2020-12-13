import React from "react";
import { Line } from "react-chartjs-2";

function Chart(props) {
  console.log(props.data.chartData);
  return (
    <div className="chart">
      {props.data.chartData != undefined ? (
        <Line
          data={props.data.chartData}
          width={100}
          height={50}
          options={{
            title: {
              display: true,
              text: "Words per Minute History",
              fontSize: 25,
            },
            maintainAspectRatio: true,
          }}
        />
      ) : (
        <div>No results to display</div>
      )}
    </div>
  );
}

export default Chart;
