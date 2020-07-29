import express from "express";
import { getForecast } from "../services/smhi.services";
import { getYRForecast, ParameterName } from "../services/yr.service";
import { to, insert, parseSMHI, parseYR } from "../utils/utils";
import { timeStamp } from "console";

export const handleTest = (req: express.Request, res: express.Response) => {
  res.send("Hello");
};

export const handleGetSMHIForecast = async (
  req: express.Request,
  res: express.Response
) => {
  const [err, result] = await to(getForecast(57.825534, 11.665202));
  if (result) {
    res.status(200).send(result.data);
    return;
  }
  res.status(500).json(err);
};

export const handleGetYRForecast = async (
  req: express.Request,
  res: express.Response
) => {
  const [err, result] = await to(getYRForecast(57.825534, 11.665202));
  if (result) {
    res.status(200).send(result.data);
    return;
  }
  res.status(500).json(err);
};

export const handleGetWind = async (
  req: express.Request,
  res: express.Response
) => {
  const [, smhi] = await to(getForecast(57.825534, 11.665202));
  const [, yr] = await to(getYRForecast(57.825534, 11.665202));
  const wind = insert(
    insert([], parseSMHI(smhi.data, "gust"), "smhi"),
    parseYR(yr.data, ParameterName.wind_speed),
    "yr"
  );
  res.status(200).send(
    Object.keys(wind).map(k => {
      return { timestamp: k, values: wind[k] };
    })
  );
};
