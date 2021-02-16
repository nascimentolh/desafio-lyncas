import { inject, injectable } from 'tsyringe';
import Test from '../infra/typeorm/entities/Test';
import ITestsRepository from '../repositories/ITestsRepository';

@injectable()
class ListTestsService {
  constructor(
    @inject('TestsRepository')
    private testsRepository: ITestsRepository
  ) {}

  public async execute(): Promise<Test[]> {
    return this.testsRepository.listAll();
  }
}

export default ListTestsService;
