import { StringValueObject } from "../../../Shared/domain/valueObject/StringValueObject";

export default class LanguageName extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.validate(value);
    }

    override validate(value: string): void {
        if (value.length < 3 || value.length > 50) {
            throw new Error(`Invalid LanguageName: ${value}`);
        }
    }

    static create(value: string): LanguageName {
        return new LanguageName(value);
    }
}
