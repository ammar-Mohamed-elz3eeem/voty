import VotesController from "@/controllers/VotesController";
import { isAuthenticated } from "@/middlewares/initMiddleware";
import { Router } from "express";

const VotesRoutes = Router();

VotesRoutes.post('/', isAuthenticated, VotesController.addNewVote);
VotesRoutes.get('/', VotesController.showVotes);
VotesRoutes.get('/:id', VotesController.showVote);
VotesRoutes.put('/:id', isAuthenticated, VotesController.editVote);
VotesRoutes.delete('/:id', isAuthenticated, VotesController.deleteVote);

export default VotesRoutes;
