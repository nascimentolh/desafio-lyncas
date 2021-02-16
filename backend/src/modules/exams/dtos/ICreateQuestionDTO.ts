import Answer from "../infra/typeorm/entities/Answer";

export default interface ICreateQuestionDTO {
    title: string;
    user_id: string;
    answer_id: string;
    answers: Answer[];
}