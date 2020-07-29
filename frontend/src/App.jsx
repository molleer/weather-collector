import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  Legend,
} from "recharts";

//const data = [{ val: { hej: 1 } }, { val: { hej: 2 } }, { val: { hej: 2.5 } }];
const getData = (timeSeries) =>
  timeSeries.map((e) => e.parameters.find((param) => param.name === "t"));

const App = () => {
  const [data, setData] = useState();
  useEffect(() => {
    Axios.get("/api/smhi").then((res) => {
      setData(getData(res.data.timeSeries));
      console.log(res.data);
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
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Line type="monotone" dataKey="values.0" name="Value" stroke="#82ca9d" />
    </LineChart>
  );
};

export default App;
