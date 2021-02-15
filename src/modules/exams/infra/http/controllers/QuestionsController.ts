import CreateQuestionService from '@modules/exams/services/CreateQuestionService';
import ListByIdQuestionService from '@modules/exams/services/ListByIdQuestionService';
import ListQuestionsService from '@modules/exams/services/ListQuestionsService';
import UpdateQuestionService from '@modules/exams/services/UpdateQuestionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class QuestionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listQuestions = container.resolve(ListQuestionsService);
    const questions = await listQuestions.execute();

    return response.json(questions);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, answer_id, answers } = request.body;
    const createQuestion = container.resolve(CreateQuestionService);
    const question = await createQuestion.execute({
      title,
      user_id: request.user.id,
      answer_id,
      answers
    });

    return response.json(question);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, answer_id, answers } = request.body;
    const updateQuestion = container.resolve(UpdateQuestionService);
    const question = await updateQuestion.execute({
      id: request.params.id,
      title,
      answer_id,
      answers,
    });

    return response.json(question);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const getQuestion = container.resolve(ListByIdQuestionService);
    const question = await getQuestion.execute(request.params.id);

    return response.json(question);
  }
}
