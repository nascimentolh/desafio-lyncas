import CreateQuestionService from '@modules/exams/services/CreateQuestionService';
import CreateStatService from '@modules/exams/services/CreateStatService';
import CreateTestService from '@modules/exams/services/CreateTestService';
import ListStatsService from '@modules/exams/services/ListStatsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class StatsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStats = container.resolve(ListStatsService);
    const stats = await listStats.execute();

    return response.json(stats);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { doer, total, hits, test_id } = request.body;
    const createTest = container.resolve(CreateStatService);
    const test = await createTest.execute({
      doer,
      total,
      hits,
      test_id,
    });

    return response.json(test);
  }
}
