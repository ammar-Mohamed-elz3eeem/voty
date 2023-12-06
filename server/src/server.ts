import { app } from "@/app";
import HomePageController from "@/controllers/HomeController";
import { isAuthenticated } from "@/middlewares/initMiddleware";
import ErrorController from "./controllers/ErrorController";

app.get("/", HomePageController.home);
app.use('*', ErrorController.errRoute);
