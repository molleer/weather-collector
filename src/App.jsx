import React from "react";
import Chart from "./charts/Chart";

const App = () => {
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
      }}
    >
      <h3>Timvis prognos [m/s]</h3>
      <Chart />
    </div>
  );
};

export default App;
