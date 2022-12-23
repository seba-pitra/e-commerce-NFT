import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../redux/actions/index.js";
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
import "./BarChart.css";

Chart.defaults.color = "black";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graficos = () => {
  const { nfts, collections } = useSelector((state) => state);

  const [data, setData] = useState([]);
  const [avgPrice, setAvgPrice] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllNfts());
    dispatch(actions.getAllCollections());
  }, [dispatch]);

  const collectionName = collections.map((names) => names.name);
  const NftsCollection = nfts.map((names) => names.collection.name);

  const creatingData = () => {
    let datos = [];
    let precioMedio = [];
    let totalPrecio = [];
    collectionName.forEach((element) => {
      let collectionArray = NftsCollection.filter((data) => data === element);
      let nftArray = nfts.filter((data) => data.collection.name === element);
      datos.push(collectionArray.length);
      precioMedio.push(
        nftArray.map((elem) => elem.price).reduce((a, c) => a + c) /
          nftArray.length
      );
      totalPrecio.push(
        nftArray.map((elem) => elem.price).reduce((a, c) => a + c)
      );
    });
    setData(datos);
    setAvgPrice(precioMedio);
    setTotalPrice(totalPrecio);
  };

  useEffect(() => {
    creatingData();
  }, [nfts, collections]);

  const chartData = {
    labels: collectionName,
    datasets: [
      {
        label: "Nfts Quantity",
        backgroundColor: "rgba(211, 68, 139, 1)",
        borderRadius: 5,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(211, 68, 139, 0.5)",
        data: data,
      },
      {
        label: "Collection Average Price",
        backgroundColor: "rgba(0, 68, 139, 1)",
        borderRadius: 5,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 68, 139, 0.5)",
        data: avgPrice,
      },
      {
        label: "Collection Total Price",
        backgroundColor: "rgba(211, 68, 0, 1)",
        borderRadius: 5,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(211, 68, 0, 0.5)",
        data: totalPrice,
      },
    ],
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Grafica",
      },
    },
    scales: {
      y: {
        min: 0,
        suggestedMax: 10,
      },
    },
    ticks: {
      // forces step size to be 50 units
      stepSize: 1,
    },
  };

  return (
    <div className="graficos">
      <h1>Test</h1>
      <div className="grafic-container">
        <Bar data={chartData} options={opciones} />
      </div>
    </div>
  );
};

export default Graficos;
