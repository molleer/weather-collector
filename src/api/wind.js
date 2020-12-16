import Axios from "axios";

const smhiBase = "https://opendata-download-metfcst.smhi.se/api";
const yrBase = "https://api.met.no/weatherapi";

export const getForecast = (latitude, longitude) =>
  Axios.get(
    `${smhiBase}/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`
  );

export const getYRForecast = (latitude, longitude) =>
  Axios.get(
    `${yrBase}/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`
  );
