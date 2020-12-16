import React, { useState, useEffect } from "react";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  Legend,
} from "recharts";
import Axios from "axios";
import { getForecast, getYRForecast } from "../api/wind";
import { insert, parseSMHI, parseYR, to } from "../utils";

const Chart = () => {
  const [data, setData] = useState([]);
  const [smhi, setSMHI] = useState([]);
  const [yr, setYR] = useState([]);
  useEffect(() => {
    getForecast(57.825534, 11.665202)
      .then((res) => setSMHI(parseSMHI(res.data, "gust")))
      .catch((err) => console.log("Unable to fetch SMHI", err));
  }, []);

  useEffect(() => {
    getYRForecast(57.825534, 11.665202)
      .then((res) => setYR(parseYR(res.data, "wind_speed")))
      .catch((err) => console.log("Unable to fetch YR", err));
  }, []);

  useEffect(() => {
    const wind = insert(insert([], smhi, "smhi"), yr, "yr");
    setData(
      Object.keys(wind).map((k) => {
        return { timestamp: k, values: wind[k] };
      })
    );
  }, [smhi, yr]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <LineChart
      style={{ margin: "2rem" }}
      width={1300}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Line
        type="monotone"
        dataKey="values.smhi"
        name="SMHI"
        stroke="#82ca9d"
      />
      <Line type="monotone" dataKey="values.yr" name="YR" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Chart;
