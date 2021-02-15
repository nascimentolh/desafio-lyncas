import { inject, injectable } from "tsyringe";
import Answer from "../infra/typeorm/entities/Answer";
import IAnswersRepository from "../repositories/IAnswersRepository";


@injectable()
class ListByIdAnswerService {
    constructor (
        @inject('AnswersRepository')
        private answersRepository: IAnswersRepository
    ) {}

    public async execute(id: string): Promise<Answer | undefined> {
        return this.answersRepository.findById(id);
    }
}

export default ListByIdAnswerService;