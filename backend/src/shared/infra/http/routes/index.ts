import { Router } from 'express';
import authRouter from '@modules/users/infra/http/routes/auth.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import answerRoute from '@modules/exams/infra/http/routes/answer.route';
import questionRoute from '@modules/exams/infra/http/routes/question.route';
import testRoute from '@modules/exams/infra/http/routes/tests.route';
import statRoute from '@modules/exams/infra/http/routes/stats.route';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/profile', profileRouter);
routes.use('/users', usersRouter);
routes.use('/answers', answerRoute);
routes.use('/questions', questionRoute);
routes.use('/tests', testRoute);
routes.use('/stats', statRoute);

export default routes;
