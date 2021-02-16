import authenticated from '@modules/users/infra/http/middlewares/authenticated';
import { Router } from 'express';
import TestsController from '../controllers/TestsController';

const testRoute = Router();
const testController = new TestsController();

testRoute.get('/', testController.index);
testRoute.get('/:id', testController.show);
testRoute.use(authenticated);
testRoute.post('/', testController.create);

export default testRoute;
