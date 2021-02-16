import { inject, injectable } from 'tsyringe';
import ICreateStatDTO from '../dtos/ICreateStatDTO';
import Stat from '../infra/typeorm/entities/Stat';
import IStatsRepository from '../repositories/IStatsRepository';

@injectable()
class CreateStatService {
  constructor(
    @inject('StatsRepository')
    private statsRepository: IStatsRepository
  ) {}

  public async execute({
    doer,
    total,
    hits,
    test_id,
  }: ICreateStatDTO): Promise<Stat> {
    return this.statsRepository.create({ doer, total, hits, test_id });
  }
}

export default CreateStatService;
