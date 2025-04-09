import ILanguageModel from '../application/LanguageModel';
import Language from '../domain/model/Lenguage';

export default function toDomainModel(data: ILanguageModel): Language {
  return Language.fromPrimitives(data);
}
