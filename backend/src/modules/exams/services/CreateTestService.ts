import { inject, injectable } from 'tsyringe';
import ICreateTestDTO from '../dtos/ICreateTestDTO';
import Test from '../infra/typeorm/entities/Test';
import ITestsRepository from '../repositories/ITestsRepository';

@injectable()
class CreateTestService {
  constructor(
    @inject('TestsRepository')
    private testsRepository: ITestsRepository
  ) {}

  public async execute({
    name,
    user_id,
    questions,
  }: ICreateTestDTO): Promise<Test> {
    return this.testsRepository.create({ name, user_id, questions });
  }
}

export default CreateTestService;
