import UseCaseBase from '../../../Shared/application/UseCaseBase';
import Language from '../../domain/model/Lenguage';
import ILanguageRepository from '../../domain/repository/LanguageRepository';

export default class GetAllLanguagesUseCase extends UseCaseBase<
  void,
  Language[]
> {
  constructor(private readonly languageRepository: ILanguageRepository) {
    super();
  }

  override async execute(): Promise<Language[]> {
    try {
      const languages = await this.languageRepository.findAll();
      if (!languages || languages.length === 0) {
        throw new Error('No languages found.');
      }
      return languages;
    } catch (error) {
      console.error('Error fetching all languages:', error);
      throw new Error(`Failed to fetch all languages: ${error}`);
    }
  }
}
