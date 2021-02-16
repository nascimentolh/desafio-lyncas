import { inject, injectable } from 'tsyringe';
import Test from '../infra/typeorm/entities/Test';
import ITestsRepository from '../repositories/ITestsRepository';

@injectable()
class ListByIdTestService {
  constructor(
    @inject('TestsRepository')
    private testsRepository: ITestsRepository
  ) {}

  public async execute(id: string): Promise<Test | undefined> {
    return this.testsRepository.findById(id);
  }
}

export default ListByIdTestService;
