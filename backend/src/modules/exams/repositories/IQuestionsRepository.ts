import ICreateQuestionDTO from '../dtos/ICreateQuestionDTO';
import Question from '../infra/typeorm/entities/Question';

export default interface IQuestionsRepository {
  findById(id: string): Promise<Question | undefined>;
  create(data: ICreateQuestionDTO): Promise<Question>;
  save(question: Question): Promise<Question>;
  listAll(): Promise<Question[]>;
}
