import {
  handleTest,
  handleGetSMHIForecast,
  handleGetYRForecast,
  handleGetWind
} from "../controllers/weather.controller";

export const getWeatherRouter = router => {
  router.get("/", handleTest);
  router.get("/smhi", handleGetSMHIForecast);
  router.get("/yr", handleGetYRForecast);
  router.get("/wind", handleGetWind);
  return router;
};
