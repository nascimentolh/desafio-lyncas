import { inject, injectable } from 'tsyringe';
import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO';
import Answer from '../infra/typeorm/entities/Answer';
import IAnswersRepository from '../repositories/IAnswersRepository';

@injectable()
class CreateAnswerService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository
  ) {}

  public async execute({ description }: ICreateAnswerDTO): Promise<Answer> {
    return this.answersRepository.create({ description });
  }
}

export default CreateAnswerService;
