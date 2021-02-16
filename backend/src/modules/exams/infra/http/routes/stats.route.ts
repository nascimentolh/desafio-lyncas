import authenticated from '@modules/users/infra/http/middlewares/authenticated';
import { Router } from 'express';
import StatsController from '../controllers/StatsController';

const statRoute = Router();
const statController = new StatsController();

statRoute.get('/', statController.index);
statRoute.post('/', statController.create);

export default statRoute;
