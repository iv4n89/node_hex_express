import { StringValueObject } from "../../../Shared/domain/valueObject/StringValueObject";

export default class RequestDescription extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.validate(value);
    }
    
    public static create(value: string): RequestDescription {
        return new RequestDescription(value);
    }
    
    validate(value: string): void {
        if (value.length < 10) {
            throw new Error('Request description must be at least 10 characters long');
        }
        if (value.length > 200) {
            throw new Error('Request description must be at most 200 characters long');
        }
    }

}
