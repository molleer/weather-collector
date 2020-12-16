export const to = (promise) =>
  promise.then((res) => [null, res]).catch((err) => [err]);

export const parseSMHI = (data, parameterName) =>
  data.timeSeries.map((stamp) => {
    return {
      timestamp: stamp.validTime,
      value: stamp.parameters.find((param) => param.name === parameterName)
        .values[0],
    };
  });

export const parseYR = (data, parameterName) =>
  data.properties.timeseries.map((stamp) => {
    return {
      timestamp: stamp.time,
      value: stamp.data.instant.details[parameterName],
    };
  });

export const insert = (result, source, key) => {
  for (var i = 0; source.length > i; i++) {
    if (!result[source[i].timestamp]) {
      result[source[i].timestamp] = {};
    }
    result[source[i].timestamp][key] = source[i].value;
  }
  return result;
};
