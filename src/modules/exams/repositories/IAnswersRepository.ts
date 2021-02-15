import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO';
import Answer from '../infra/typeorm/entities/Answer';

export default interface IAnswersRepository {
  findById(id: string): Promise<Answer | undefined>;
  create(data: ICreateAnswerDTO): Promise<Answer>;
  save(answer: Answer): Promise<Answer>;
  listAll(): Promise<Answer[]>;
}
