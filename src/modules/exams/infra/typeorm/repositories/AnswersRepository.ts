import ICreateAnswerDTO from '@modules/exams/dtos/ICreateAnswerDTO';
import IAnswersRepository from '@modules/exams/repositories/IAnswersRepository';
import { getRepository, Repository } from 'typeorm';
import Answer from '../entities/Answer';

class AnswersRepository implements IAnswersRepository {
  private ormRepository: Repository<Answer>;

  constructor() {
    this.ormRepository = getRepository(Answer);
  }

  public async findById(id: string): Promise<Answer | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async create(data: ICreateAnswerDTO): Promise<Answer> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(answer: Answer): Promise<Answer> {
    return this.ormRepository.save(answer);
  }

  public async listAll(): Promise<Answer[]> {
    return this.ormRepository.find();
  }
}

export default AnswersRepository;
