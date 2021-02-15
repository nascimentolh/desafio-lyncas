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
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async create(data: ICreateQuestionDTO): Promise<Question> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(question: Question): Promise<Question> {
    return this.ormRepository.save(question);
  }

  public async listAll(): Promise<Question[]> {
    return this.ormRepository.find({ relations: ["answers", "answer"] });
  }
}

export default QuestionsRepository;
