import ICreateStatDTO from '@modules/exams/dtos/ICreateStatDTO';
import IStatsRepository from '@modules/exams/repositories/IStatsRepository';
import { getRepository, Repository } from 'typeorm';
import Stat from '../entities/Stat';

class StatsRepository implements IStatsRepository {
  private ormRepository: Repository<Stat>;

  constructor() {
    this.ormRepository = getRepository(Stat);
  }

  public async findById(id: string): Promise<Stat | undefined> {
    const stat = await this.ormRepository.findOne(id);
    return stat;
  }

  public async create(data: ICreateStatDTO): Promise<Stat> {
    const stat = this.ormRepository.create(data);

    await this.ormRepository.save(stat);

    return stat;
  }

  public async save(stat: Stat): Promise<Stat> {
    return this.ormRepository.save(stat);
  }

  public async listAll(): Promise<Stat[]> {
    return this.ormRepository.find();
  }
}

export default StatsRepository;
