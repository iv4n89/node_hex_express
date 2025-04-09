import { MotherCreator } from './MotherCreator';

export class EmailMother {
  static random() {
    return MotherCreator.random().internet.email();
  }
}
