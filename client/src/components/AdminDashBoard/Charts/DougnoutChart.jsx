import React, { useEffect, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./stylesheets/DoungnoutChart.module.css";

Chart.defaults.color = "rgba(211, 68, 139, 1)";
Chart.register(ArcElement, Tooltip, Legend);

const DougnoutChart = ({ users }) => {
  const [types, setTypes] = useState([
    ...new Set(users.map((user) => user.type)),
  ]);

  useEffect(() => {
    setTypes([...new Set(users.map((user) => user.type))]);
  }, [users]);

  // por favor no olvidarse de eliminar estos console logs cuando este terminado.
  console.log(users);
  console.log("types", types);
  console.log(
    "values",
    types.map((type) => users.filter((user) => user.type === type).length)
  );

  const chartData = {
    labels: types,
    datasets: [
      {
        data: types.map(
          (type) => users.filter((user) => user.type === type).length
        ),
        backgroundColor: ["#E0E0E0", "#e0b1cb", "#5e548e"],
        borderColor: "#232c3d",
        hoverBackgroundColor: "#212121",
        hoverOffset: 10,
        cutout: 0,
        radius: "90%",
      },
    ],
  };

  // className={styles[]}

  return (
    <div className={styles["doughnut-chart-container"]}>
      <Doughnut data={chartData} />
    </div>
  );
};

export default DougnoutChart;
