import { MotherCreator } from './MotherCreator';

export class TextMother {
  static random(length: number = 10) {
    return MotherCreator.random().lorem.text().substring(0, length);
  }
}
