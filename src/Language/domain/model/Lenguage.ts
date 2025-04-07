import LanguageId from '../valueObject/LanguageId';
import LanguageName from '../valueObject/LanguageName';

export default class Language {
  id: LanguageId;
  name: LanguageName;
  createdAt: Date;
  updatedAt?: Date;

  constructor(id: LanguageId, name: LanguageName) {
    this.id = id;
    this.name = name;
    this.createdAt = new Date();
  }

  static fromPrimitives({ id, name }: { id: string; name: string }): Language {
    return new Language(LanguageId.create(id), LanguageName.create(name));
  }

  static createWithoutId(name: string): Language {
    return new Language(LanguageId.generate(), LanguageName.create(name));
  }

  toPrimitives(): { id: string; name: string; createdAt: Date; updatedAt?: Date } {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt || undefined,
    };
  }
}
