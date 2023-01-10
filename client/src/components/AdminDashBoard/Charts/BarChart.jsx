import React, { useEffect, useState } from "react";
import {
  CategoryScale,
  Chart,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./stylesheets/BarChart.module.css";

Chart.defaults.color = "rgba(211, 68, 139, 1)";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartNfts, chartCollections }) => {
  const [data, setData] = useState([]);
  const [avgPrice, setAvgPrice] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [collectionName, setCollectionName] = useState(
    chartCollections.map((names) => names.name)
  );
  const [NftsCollection, setNftsCollection] = useState(
    chartNfts.map((names) =>
      names.collection ? names.collection.name : "No name"
    )
  );

  // const collectionName = collections.map((names) => names.name);
  // const NftsCollection = nfts.map((names) => names.collection.name);

  const creatingData = () => {
    let datos = [];
    let precioMedio = [];
    let totalPrecio = [];
    collectionName.forEach((element) => {
      let collectionArray = NftsCollection.filter((data) => data === element);
      let nftArray = chartNfts.filter(
        (data) => data.collection?.name === element
      );
      datos.push(collectionArray.length);
      precioMedio.push(
        nftArray.length &&
          nftArray.map((elem) => elem.price).reduce((a, c) => a + c) /
            nftArray.length
      );
      totalPrecio.push(
        nftArray.length &&
          nftArray.map((elem) => elem.price).reduce((a, c) => a + c)
      );
    });
    setData(datos);
    setAvgPrice(precioMedio);
    setTotalPrice(totalPrecio);
  };

  useEffect(() => {
    creatingData();
  }, []);

  const chartData = {
    labels: collectionName,
    datasets: [
      {
        label: "Nfts Quantity",
        color: "black",
        backgroundColor: "#38a3a5",
        borderRadius: 5,
        hoverBackgroundColor: "#10002b",
        data: data,
      },
      {
        label: "Collection Average Price",
        backgroundColor: "#6930c3",
        borderRadius: 5,
        hoverBackgroundColor: "#10002b",
        data: avgPrice,
      },
      {
        label: "Collection Total Price",
        backgroundColor: "#c7f9cc",
        borderRadius: 5,
        hoverBackgroundColor: "#10002b",
        data: totalPrice,
      },
    ],
  };

  const opciones = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 20,
            weight: "bold",
          },
          boxWidth: 20,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 80,
        // suggestedMax: 100,
      },
    },
    ticks: {
      // forces step size to be 50 units
      stepSize: 5,
    },
  };
  return (
    <div className={styles["grafic-container"]}>
      <Bar data={chartData} options={opciones} />
    </div>
  );
};

export default BarChart;
