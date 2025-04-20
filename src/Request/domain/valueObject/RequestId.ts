import { UUIDValueObject } from "../../../Shared/domain/valueObject/UUIDValueObject";

export default class RequestId extends UUIDValueObject {
    constructor(value: string) {
        super(value);
    }

    public static create(value: string): RequestId {
        return new RequestId(value);
    }

    public static generate(): RequestId {
        return new RequestId(UUIDValueObject.generate().getValue());
    }
}
