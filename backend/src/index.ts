import express from "express";
import initRoutes from "./routes";

const app: express.Application = express();

initRoutes(app, () => express.Router());

app.listen(8080, () => {
  console.log("Starting application on port 8080");
});
