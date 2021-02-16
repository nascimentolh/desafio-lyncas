import ICreateQuestionDTO from '@modules/exams/dtos/ICreateQuestionDTO';
import IQuestionsRepository from '@modules/exams/repositories/IQuestionsRepository';
import { getRepository, Repository } from 'typeorm';
import Question from '../entities/Question';

class QuestionsRepository implements IQuestionsRepository {
  private ormRepository: Repository<Question>;

  constructor() {
    this.ormRepository = getRepository(Question);
  }

  public async findById(id: string): Promise<Question | undefined> {
    const question = await this.ormRepository.findOne(id);
    return question;
  }

  public async create(data: ICreateQuestionDTO): Promise<Question> {
    const question = this.ormRepository.create(data);

    await this.ormRepository.save(question);

    return question;
  }

  public async save(question: Question): Promise<Question> {
    return this.ormRepository.save(question);
  }

  public async listAll(): Promise<Question[]> {
    return this.ormRepository.find({ relations: ["answers", "answer"] });
  }
}

export default QuestionsRepository;
