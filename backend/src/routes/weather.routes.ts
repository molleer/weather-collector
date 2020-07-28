import { handleTest } from "../controllers/weather.controller";

export const getWeatherRouter = (router) => {
  router.get("/", handleTest);
  return router;
};
