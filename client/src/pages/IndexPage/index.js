import { useState, useEffect } from "react";
import Chart from "../../components/Chart";
import API from "../../util/API";

const IndexPage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    API.Stats.getAll().then(function (results) {
      console.log(results.data);
      setData({
        chartData: {
          labels: results.data.map((x) => x.wpm),
          datasets: [
            {
              label: "Words per Minute",
              data: results.data.map((x) => x.wpm),
              backgroundColor: "rgba(0, 255,0 , 0.3)",
            },
          ],
        },
      });
    });
  }, []);

  return (
    <>
      <Chart data={data} />
    </>
  );
};

export default IndexPage;
