import React from "react";
import { Line } from "react-chartjs-2";
// import TestPage, { WPM } from "../../pages/TestPage/index";

function Chart(props) {
  console.log(props.data.chartData);
  return (
    <div>
      <div className="head-gradient"></div>
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
      <div className="foot-gradient"></div>
    </div>
  );
}

export default Chart;
