import { inject, injectable } from "tsyringe";
import Answer from "../infra/typeorm/entities/Answer";
import IAnswersRepository from "../repositories/IAnswersRepository";


@injectable()
class ListAnswersService {
    constructor (
        @inject('AnswersRepository')
        private answersRepository: IAnswersRepository
    ) {}

    public async execute(): Promise<Answer []> {
        return this.answersRepository.listAll();
    }
}

export default ListAnswersService;