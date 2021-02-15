import CreateAnswerService from '@modules/exams/services/CreateAnswerService';
import ListAnswersService from '@modules/exams/services/ListAnswersService';
import ListByIdAnswerService from '@modules/exams/services/ListByIdAnswerService';
import { Request, response, Response } from 'express';
import { container } from 'tsyringe';

export default class AnswersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAnswers = container.resolve(ListAnswersService);
    const answers = await listAnswers.execute();

    return response.json(answers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const createAnswer = container.resolve(CreateAnswerService);
    const answer = await createAnswer.execute({ description });

    return response.json(answer);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const getAnswer = container.resolve(ListByIdAnswerService);
    const answer = await getAnswer.execute(request.params.id);

    return response.json(answer);
  }
}
