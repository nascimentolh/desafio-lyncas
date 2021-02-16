import ICreateTestDTO from '@modules/exams/dtos/ICreateTestDTO';
import ITestsRepository from '@modules/exams/repositories/ITestsRepository';
import { getRepository, Repository } from 'typeorm';
import Test from '../entities/Test';

class TestsRepository implements ITestsRepository {
  private ormRepository: Repository<Test>;

  constructor() {
    this.ormRepository = getRepository(Test);
  }

  public async findById(id: string): Promise<Test | undefined> {
    const test = await this.ormRepository
      .createQueryBuilder('test')
      .where({ id: id })
      .select([
        'test.id',
        'test.name',
        'questions.title',
        'answers.description',
        'answer.description',
      ])
      .leftJoin('test.questions', 'questions')
      .leftJoin('questions.answers', 'answers')
      .leftJoin('questions.answer', 'answer')
      .getOne();
    return test;
  }

  public async create(data: ICreateTestDTO): Promise<Test> {
    const test = this.ormRepository.create(data);

    await this.ormRepository.save(test);

    return test;
  }

  public async save(test: Test): Promise<Test> {
    return this.ormRepository.save(test);
  }

  public async listAll(): Promise<Test[]> {
    return this.ormRepository.find({ relations: ['questions'] });
  }
}

export default TestsRepository;
