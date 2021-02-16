import { inject, injectable } from 'tsyringe';
import Stat from '../infra/typeorm/entities/Stat';
import IStatsRepository from '../repositories/IStatsRepository';

@injectable()
class ListStatsService {
  constructor(
    @inject('StatsRepository')
    private statsRepository: IStatsRepository
  ) {}

  public async execute(): Promise<Stat []> {
    return this.statsRepository.listAll();
  }
}

export default ListStatsService;
