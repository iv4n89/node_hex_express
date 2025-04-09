import UseCaseBase from '../../../Shared/application/UseCaseBase';
import Language from '../../domain/model/Lenguage';
import ILanguageRepository from '../../domain/repository/LanguageRepository';
import LanguageId from '../../domain/valueObject/LanguageId';

interface Input {
  id: string;
  name: string;
}

export default class UpdateLanguageUseCase extends UseCaseBase<Input, boolean> {
  constructor(private readonly languageRepository: ILanguageRepository) {
    super();
  }

  override async execute(input: Input): Promise<boolean> {
    try {
      const languageId = LanguageId.create(input.id);
      const existingLanguage =
        await this.languageRepository.findById(languageId);
      if (!existingLanguage) {
        throw new Error(`Language with ID ${input.id} not found.`);
      }
      const updatedLanguage = Language.fromPrimitives({
        id: languageId.getValue(),
        name: input.name,
      });
      const result = await this.languageRepository.update(updatedLanguage);
      if (!result) {
        throw new Error(`Failed to update language with ID ${input.id}.`);
      }
      return result;
    } catch (error) {
      console.error('Error updating language:', error);
      throw new Error(`Failed to update language: ${error}`);
    }
  }
}
