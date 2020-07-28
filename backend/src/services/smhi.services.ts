import Axios from "axios";

interface Parameter {
  name: string;
  levelType: string;
  level: string;
  unit: string;
}

interface SMHITimestamp {
  validTime: string;
  parameters: Parameter[];
}

interface Geometry {
  type: string;
  coordinates: number[][];
}

export interface SMHIResult {
  approvedTime: string;
  referenceTime: string;
  geometry: Geometry;
  timeSeries: SMHITimestamp;
}

const smhiBase = "https://opendata-download-metfcst.smhi.se/api";

export const getForecast = async (latitude: number, longitude: number) =>
  Axios.get<SMHIResult>(
    `${smhiBase}/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`
  );
