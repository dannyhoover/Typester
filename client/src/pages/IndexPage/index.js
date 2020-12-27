import { useState, useEffect } from "react";
import Chart from "../../components/Chart";

const IndexPage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      chartData: {
        labels: ["point 1", "point 2", "point 3", "point 4", "point 5"],
        datasets: [
          {
            label: "Words per Minute",
            data: [23, 24, 25, 50, 45],
            backgroundColor: "rgba(0, 255,0 , 0.3)",
          },
        ],
      },
    });
  }, []);

  return (
    <>
      <Chart data={data} />
    </>
  );
};

export default IndexPage;
