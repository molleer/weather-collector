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

const Chart = () => {
  const [data, setData] = useState();
  useEffect(() => {
    Axios.get("/api/wind").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <LineChart
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
