import { MotherCreator } from './MotherCreator';

export class LastNameMother {
  static random() {
    return MotherCreator.random().name.lastName();
  }
}
