import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUpdateQuestionsDTO from '../dtos/IUpdateQuestionsDTO';
import Question from '../infra/typeorm/entities/Question';
import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
class UpdateQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ id, title, answer_id, answers }: IUpdateQuestionsDTO): Promise<Question> {
    const question = await this.questionsRepository.findById(id);

    if (!question) {
      throw new AppError('Question not found');
    }

    question.title = title;
    question.answer_id = answer_id;
    question.answers = answers;

    return this.questionsRepository.save(question);
  }
}

export default UpdateQuestionService;
