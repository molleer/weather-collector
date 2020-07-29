import {
  handleTest,
  handleGetSMHIForecast,
  handleGetYRForecast
} from "../controllers/weather.controller";

export const getWeatherRouter = router => {
  router.get("/", handleTest);
  router.get("/smhi", handleGetSMHIForecast);
  router.get("/yr", handleGetYRForecast);
  return router;
};
