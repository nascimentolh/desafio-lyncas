import ICreateStatDTO from '../dtos/ICreateStatDTO';
import Stat from '../infra/typeorm/entities/Stat';

export default interface IStatsRepository {
  findById(id: string): Promise<Stat | undefined>;
  create(data: ICreateStatDTO): Promise<Stat>;
  save(stat: Stat): Promise<Stat>;
  listAll(): Promise<Stat[]>;
}
