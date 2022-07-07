import { QuestionTypeEnum } from "src/enums";

export class CreatePitanjeDto {
    text: string;
    isCorrect: boolean;
    categories: number[];
    type: QuestionTypeEnum;
    answer: string;
}
