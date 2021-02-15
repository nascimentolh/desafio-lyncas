import { Router } from 'express';
import AnswersController from '../controllers/AnswersController';

const answerRoute = Router();
const answerController = new AnswersController();

answerRoute.get('/', answerController.index);
answerRoute.get('/:id', answerController.show);
answerRoute.post('/', answerController.create);

export default answerRoute;