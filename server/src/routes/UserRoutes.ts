import UserController from "@/controllers/UserController";
import { Router } from "express";

const UsersRoute = Router();

UsersRoute.post("/users", UserController.createUser);
UsersRoute.post("/login", UserController.authenticate);
UsersRoute.get("/logout", UserController.logout);

export default UsersRoute;
