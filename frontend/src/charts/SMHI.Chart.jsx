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

const parseSMHIData = (timeSeries, parameterName) =>
  timeSeries.map((e) => {
    return {
      time: e.validTime,
      parameter: e.parameters.find((param) => param.name === parameterName),
    };
  });

const SMHIChart = () => {
  const [data, setData] = useState();
  useEffect(() => {
    Axios.get("/api/smhi").then((res) => {
      setData(parseSMHIData(res.data.timeSeries, "gust"));
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
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Line
        type="monotone"
        dataKey="parameter.values.0"
        name="Value"
        stroke="#82ca9d"
      />
    </LineChart>
  );
};

export default SMHIChart;
