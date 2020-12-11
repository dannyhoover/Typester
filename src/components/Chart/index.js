import React from "react";
import {Line} from 'react-chartjs-2';


function Chart(props) {
    return (
      <div className="chart">
        <Line
          data={props.data.chartData.data}
          width={100}
          height={50}
          options={{
            title:{
              display: true,
              text: "Words per Minute History",
              fontSize: 25
            },
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  };
  
  export default Chart;
  