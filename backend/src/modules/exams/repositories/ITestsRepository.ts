import ICreateQuestionDTO from '../dtos/ICreateQuestionDTO';
import ICreateTestDTO from '../dtos/ICreateTestDTO';
import Question from '../infra/typeorm/entities/Question';
import Test from '../infra/typeorm/entities/Test';

export default interface ITestsRepository {
  findById(id: string): Promise<Test | undefined>;
  create(data: ICreateTestDTO): Promise<Test>;
  save(test: Test): Promise<Test>;
  listAll(): Promise<Test[]>;
}
