import VotesController from "@/controllers/VotesController";
import { isAuthenticated } from "@/middlewares/initMiddleware";
import { Router } from "express";

const VotesRoutes = Router();

VotesRoutes.post('/', isAuthenticated, VotesController.addNewVote);
VotesRoutes.get('/vote/:id', isAuthenticated, VotesController.showVote);
VotesRoutes.get('/', VotesController.showVotes);
VotesRoutes.put('/vote/:id', isAuthenticated, VotesController.editVote);
VotesRoutes.delete('/vote/:id', isAuthenticated, VotesController.deleteVote);
