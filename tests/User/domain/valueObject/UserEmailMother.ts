import UserEmail from "../../../../src/User/domain/valueObject/UserEmail";
import { MotherCreator } from "../../../Shared/domain/MotherCreator";

export class UserEmailMother {
  static create(value: string): UserEmail {
    return UserEmail.create(value);
  }

  static generate(): UserEmail {
    return UserEmail.create(MotherCreator.random().internet.email());
  }
}
