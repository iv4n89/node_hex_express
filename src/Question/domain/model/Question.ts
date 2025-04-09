import LanguageId from '../../../Language/domain/valueObject/LanguageId';
import QuestionDescription from '../valueObject/QuestionDescription';
import QuestionId from '../valueObject/QuestionId';

export default class Question {
  id: QuestionId;
  languageId: LanguageId;
  descriptions: QuestionDescription[];
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    id: QuestionId,
    languageId: LanguageId,
    descriptions: QuestionDescription[],
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.languageId = languageId;
    this.descriptions = descriptions;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  static create(
    id: QuestionId,
    languageId: LanguageId,
    descriptions: QuestionDescription[]
  ): Question {
    return new Question(id, languageId, descriptions);
  }

  static fromPrimitives({
    id,
    languageId,
    descriptions,
    createdAt,
    updatedAt,
  }: {
    id: string;
    languageId: string;
    descriptions: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }): Question {
    return new Question(
      QuestionId.create(id),
      LanguageId.create(languageId),
      descriptions.map((description) =>
        QuestionDescription.create(description)
      ),
      new Date(createdAt || Date.now()),
      new Date(updatedAt || Date.now())
    );
  }

  static createWithoutId(
    languageId: LanguageId,
    descriptions: QuestionDescription[]
  ): Question {
    return new Question(QuestionId.generate(), languageId, descriptions);
  }

  toPrimitives(): {
    id: string;
    languageId: string;
    descriptions: string[];
    createdAt: Date;
    updatedAt?: Date;
  } {
    return {
      id: this.id.getValue(),
      languageId: this.languageId.getValue(),
      descriptions: this.descriptions.map((description) =>
        description.getValue()
      ),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
