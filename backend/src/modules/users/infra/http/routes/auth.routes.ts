import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import authenticated from '../middlewares/authenticated';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/', authController.authenticate);
authRouter.use(authenticated);
authRouter.post('/validate', authController.validate);

export default authRouter;
