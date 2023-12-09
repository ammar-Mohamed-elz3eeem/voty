import express from 'express';
import EnvLoader from '@/utils/envClient';
import { init } from '@/middlewares/initMiddleware';
import bodyParser from 'body-parser';
import ESess from 'express-session';
import UsersRoute from '@/routes/UserRoutes';
import VotesRoutes from '@/routes/VotesRoute';

EnvLoader.loadEnv();

export const app = express();
const PORT = 4545;

app.use(init);
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(ESess({
  secret: 'MySeSSionSecRet',
  resave: false,
  saveUninitialized: true,
}));
app.use("/users", UsersRoute);
app.use("/votes", VotesRoutes);

app.listen(PORT, () => {
  console.log('listening to server on port:', PORT);
});
