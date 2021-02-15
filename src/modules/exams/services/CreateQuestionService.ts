import { inject, injectable } from 'tsyringe';
import ICreateQuestionDTO from '../dtos/ICreateQuestionDTO';
import Question from '../infra/typeorm/entities/Question';
import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
class CreateQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({
    title,
    user_id,
    answer_id,
    answers
  }: ICreateQuestionDTO): Promise<Question> {
    return this.questionsRepository.create({ title, user_id, answer_id, answers });
  }
}

export default CreateQuestionService;
