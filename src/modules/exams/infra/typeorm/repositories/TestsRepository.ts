import ICreateQuestionDTO from '@modules/exams/dtos/ICreateQuestionDTO';
import ICreateTestDTO from '@modules/exams/dtos/ICreateTestDTO';
import ITestsRepository from '@modules/exams/repositories/ITestsRepository';
import { getRepository, Repository } from 'typeorm';
import Question from '../entities/Question';
import Test from '../entities/Test';

class TestsRepository implements ITestsRepository {
  private ormRepository: Repository<Test>;

  constructor() {
    this.ormRepository = getRepository(Test);
  }

  public async findById(id: string): Promise<Test | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async create(data: ICreateTestDTO): Promise<Test> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(test: Test): Promise<Test> {
    return this.ormRepository.save(test);
  }

  public async listAll(): Promise<Test[]> {
    return this.ormRepository.find({ relations: ["questions"] });
  }
}

export default TestsRepository;
