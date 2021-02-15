import CreateTestService from '@modules/exams/services/CreateTestService';
import ListTestsService from '@modules/exams/services/ListTestsService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class TestsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTests = container.resolve(ListTestsService);
    const tests = await listTests.execute();

    return response.json(tests);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, questions } = request.body;
    console.log(name, questions);
    const createTest = container.resolve(CreateTestService);
    const test = await createTest.execute({
      name,
      user_id: request.user.id,
      questions,
    });

    return response.json(test);
  }
}
