import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAnswersRepository from '@modules/exams/repositories/IAnswersRepository';
import AnswersRepository from '@modules/exams/infra/typeorm/repositories/AnswersRepository';
import QuestionsRepository from '@modules/exams/infra/typeorm/repositories/QuestionsRepository';
import IQuestionsRepository from '@modules/exams/repositories/IQuestionsRepository';
import ITestsRepository from '@modules/exams/repositories/ITestsRepository';
import TestsRepository from '@modules/exams/infra/typeorm/repositories/TestsRepository';
import IStatsRepository from '@modules/exams/repositories/IStatsRepository';
import StatsRepository from '@modules/exams/infra/typeorm/repositories/StatsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IAnswersRepository>(
  'AnswersRepository',
  AnswersRepository
);

container.registerSingleton<IQuestionsRepository>(
  'QuestionsRepository',
  QuestionsRepository
);

container.registerSingleton<ITestsRepository>(
  'TestsRepository',
  TestsRepository
);

container.registerSingleton<IStatsRepository>(
  'StatsRepository',
  StatsRepository
);
