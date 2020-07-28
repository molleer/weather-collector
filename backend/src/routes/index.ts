import { getWeatherRouter } from "./weather.routes";

const initRoutes = (app, createRoute) => {
  app.use("/api", getWeatherRouter(createRoute()));
};

export default initRoutes;
