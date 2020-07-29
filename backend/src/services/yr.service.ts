import Axios from "axios";

interface Meta {
  updated_at: string;
  units: {
    air_pressure_at_sea_level: string;
    air_temperature: string;
    cloud_area_fraction: string;
    precipitation_amount: string;
    relative_humidity: string;
    wind_from_direction: string;
    wind_speed: string;
  };
}

interface Data {
  instant: {
    details: {
      air_pressure_at_sea_level: number;
      air_temperature: number;
      cloud_area_fraction: number;
      relative_humidity: number;
      wind_from_direction: number;
      wind_speed: number;
    };
  };
  next_12_hours: any;
  next_1_hours: any;
  next_6_hours: any;
}

interface YRTimestamp {
  time: string;
  data: Data;
}

interface Properties {
  meta: Meta;
  timeseries: YRTimestamp[];
}

interface YRResult {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: Properties;
}

const yrBase = "https://api.met.no/weatherapi";

export const getYRForecast = async (latitude: number, longitude: number) =>
  Axios.get<YRResult>(
    `${yrBase}/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`
  );
