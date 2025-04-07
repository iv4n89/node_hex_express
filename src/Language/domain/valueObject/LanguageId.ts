import { UUIDValueObject } from "../../../Shared/domain/valueObject/UUIDValueObject";

export default class LanguageId extends UUIDValueObject {
    constructor(value: string) {
        super();
        this.validate(value);
    }

    override validate(value: string): void {
        if (!this.isValidUUID(value)) {
            throw new Error(`Invalid LanguageId: ${value}`);
        }
    }

    static generate(): LanguageId {
        return new LanguageId(super.generate().getValue());
    }

    static create(value: string): LanguageId {
        return new LanguageId(value);
    }
}
