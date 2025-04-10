import UserId from "../../../../src/Shared/domain/valueObject/UserId";
import { UUIDMother } from "../../../Shared/domain/UUIDMother";

export class UserIdMother {
    static create(value: string): UserId {
        return UserId.create(value);
    }

    static generate(): UserId {
        return UserId.create(UUIDMother.random());
    }
}
