import UserName from "../../../../src/User/domain/valueObject/UserName";
import { MotherCreator } from "../../../Shared/domain/MotherCreator";

export class UserNameMother {
    static create(value: string): UserName {
        return UserName.create(value);
    }

    static generate(): UserName {
        return UserName.create(MotherCreator.random().person.firstName());
    }
}
