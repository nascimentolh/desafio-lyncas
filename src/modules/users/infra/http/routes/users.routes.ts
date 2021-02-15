import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import authenticated from '../middlewares/authenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);
usersRouter.post('/', usersController.create);
usersRouter.use(authenticated);

export default usersRouter;
