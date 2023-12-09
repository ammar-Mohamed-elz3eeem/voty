import UserController from "@/controllers/UserController";
import { isAuthenticated } from "@/middlewares/initMiddleware";
import { Router } from "express";

const UsersRoute = Router();

UsersRoute.post("/", UserController.createUser);
UsersRoute.post("/login", UserController.authenticate);
UsersRoute.post("/vote/:id", isAuthenticated, UserController.vote);
UsersRoute.post("/subscribe/:id", isAuthenticated, UserController.subscribe);
UsersRoute.get("/logout", isAuthenticated, UserController.logout);

export default UsersRoute;
