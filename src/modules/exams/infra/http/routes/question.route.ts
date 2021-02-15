import authenticated from '@modules/users/infra/http/middlewares/authenticated';
import { Router } from 'express';
import QuestionsController from '../controllers/QuestionsController';

const questionRoute = Router();
const questionsController = new QuestionsController();

questionRoute.get('/', questionsController.index);
questionRoute.get('/:id', questionsController.show);
questionRoute.use(authenticated);
questionRoute.post('/', questionsController.create);
questionRoute.put('/:id', questionsController.update);

export default questionRoute;
