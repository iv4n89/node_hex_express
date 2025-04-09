import Language from '../model/Lenguage';
import LanguageId from '../valueObject/LanguageId';
import LanguageName from '../valueObject/LanguageName';

export default interface ILanguageRepository {
  save(language: Language): Promise<boolean>;
  findById(id: LanguageId): Promise<Language | null>;
  findByName(name: LanguageName): Promise<Language | null>;
  findAll(): Promise<Language[]>;
  delete(id: LanguageId): Promise<boolean>;
  update(language: Language): Promise<boolean>;
}
