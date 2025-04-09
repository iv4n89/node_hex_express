import UseCaseBase from '../../../Shared/application/UseCaseBase';
import Language from '../../domain/model/Lenguage';
import ILanguageRepository from '../../domain/repository/LanguageRepository';
import LanguageName from '../../domain/valueObject/LanguageName';

export default class GetLanguageByNameUseCase extends UseCaseBase<
  string,
  Language
> {
  constructor(private readonly languageRepository: ILanguageRepository) {
    super();
  }

  override async execute(input: string): Promise<Language> {
    try {
      const languageName = LanguageName.create(input);
      const language = await this.languageRepository.findByName(languageName);
      if (!language) {
        throw new Error(`Language with name ${input} not found.`);
      }
      return language;
    } catch (error) {
      console.error('Error fetching language by name:', error);
      throw new Error(`Failed to fetch language by name: ${error}`);
    }
  }
}
