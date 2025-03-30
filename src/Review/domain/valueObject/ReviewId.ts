import { UUIDValueObject } from "../../../Shared/domain/valueObject/UUIDValueObject";

export default class ReviewId extends UUIDValueObject {
    constructor(value: string) {
        super(value);
    }

    public static create(value: string): ReviewId {
        return new ReviewId(value);
    }

    public static generate(): ReviewId {
        return new ReviewId(UUIDValueObject.generate().getValue());
    }
}

