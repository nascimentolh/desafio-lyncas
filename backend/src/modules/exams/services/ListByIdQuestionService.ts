import { inject, injectable } from "tsyringe";
import Question from "../infra/typeorm/entities/Question";
import IQuestionsRepository from "../repositories/IQuestionsRepository";


@injectable()
class ListByIdQuestionService {
    constructor (
        @inject('QuestionsRepository')
        private questionsRepository: IQuestionsRepository
    ) {}

    public async execute(id: string): Promise<Question | undefined> {
        return this.questionsRepository.findById(id);
    }
}

export default ListByIdQuestionService;