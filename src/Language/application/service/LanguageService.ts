import ILanguageModel from '../LanguageModel';

export default interface ILanguageService {
  create(name: string): Promise<boolean>;
  getById(id: string): Promise<ILanguageModel | null>;
  getByName(name: string): Promise<ILanguageModel | null>;
  getAll(): Promise<ILanguageModel[]>;
  delete(id: string): Promise<boolean>;
  update(id: string, name: string): Promise<boolean>;
}
