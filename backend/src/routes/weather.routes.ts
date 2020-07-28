import {
  handleTest,
  handleGetForecast
} from "../controllers/weather.controller";

export const getWeatherRouter = router => {
  router.get("/", handleTest);
  router.get("/smhi", handleGetForecast);
  return router;
};
