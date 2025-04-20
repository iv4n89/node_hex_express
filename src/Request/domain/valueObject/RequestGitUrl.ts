import { StringValueObject } from "../../../Shared/domain/valueObject/StringValueObject"

export default class RequestGitUrl extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.validate(value);
    }

    public static create(value: string): RequestGitUrl {
        return new RequestGitUrl(value);
    }

    validate(value: string): void {
        const regex = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_.-]*(\?\S+)?)?)?$/;
        if (!regex.test(value)) {
            throw new Error('Invalid Git URL');
        }
    }
}
