import Question from "../infra/typeorm/entities/Question";

export default interface ICreateTestDTO {
    name: string;
    user_id: string;
    questions: Question[];
}