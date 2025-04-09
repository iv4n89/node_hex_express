import { MotherCreator } from './MotherCreator';

export class PasswordMother {
  static random() {
    return MotherCreator.random().internet.password();
  }
}
