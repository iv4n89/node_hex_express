import { StringValueObject } from "../../../Shared/domain/valueObject/StringValueObject";

export default class QuestionDescription extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.validate(value);
    }

    static create(value: string): QuestionDescription {
        return new QuestionDescription(value);
    }

    override validate(value: string): void {
        if (typeof value !== 'string') {
            throw new Error("Question description must be a string");
        }
        if (value.length < 1 || value.length > 500) {
            throw new Error("Question description must be between 1 and 255 characters");
        }
    }
}
