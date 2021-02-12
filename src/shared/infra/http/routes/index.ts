import { Router } from 'express';
import authRouter from '@modules/users/infra/http/routes/auth.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/profile', profileRouter);
routes.use('/users', usersRouter);

export default routes;
