import express from "express";
import { getForecast } from "../services/smhi.services";
import { getYRForecast } from "../services/yr.service";
import { to } from "../utils/utils";

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
