import { SMHIResult } from "../services/smhi.services";
import { YRResult, ParameterName } from "../services/yr.service";

interface WeatherResult {
  timestamp: string;
  value: number;
}

interface Comparison {
  smhi?: number;
  yr?: number;
}

export const to = <T>(promise: Promise<T>): Promise<T[] | any[]> =>
  promise.then(res => [null, res]).catch(err => [err]);

export const parseSMHI = (
  data: SMHIResult,
  parameterName: string
): WeatherResult[] =>
  data.timeSeries.map(stamp => {
    return {
      timestamp: stamp.validTime,
      value: stamp.parameters.find(param => param.name === parameterName)
        .values[0]
    };
  });

export const parseYR = (
  data: YRResult,
  parameterName: ParameterName
): WeatherResult[] =>
  data.properties.timeseries.map(stamp => {
    return {
      timestamp: stamp.time,
      value: stamp.data.instant.details[parameterName]
    };
  });

export const insert = (
  result: Comparison[],
  source: WeatherResult[],
  key: string
) => {
  for (var i = 0; source.length > i; i++) {
    if (!result[source[i].timestamp]) {
      result[source[i].timestamp] = {};
    }
    result[source[i].timestamp][key] = source[i].value;
  }
  return result;
};
