import { UUIDValueObject } from "../../../Shared/domain/valueObject/UUIDValueObject";

export default class AuthId extends UUIDValueObject {
    constructor(value: string) {
        super(value);
    }

    public static create(value: string): AuthId {
        return new AuthId(value);
    }

    public static generate(): AuthId {
        return new AuthId(UUIDValueObject.generate().getValue());
    }
}
