import UseCaseBase from "../../../Shared/application/UseCaseBase";
import Language from "../../domain/model/Lenguage";
import ILanguageRepository from "../../domain/repository/LanguageRepository";

export default class CreateLanguageUseCase extends UseCaseBase<string, boolean> {
    constructor(private readonly languageRepository: ILanguageRepository) {
        super();
    }

    override async execute(input: string): Promise<boolean> {
        try {
            const language = Language.createWithoutId(input);
            const existingLanguage = await this.languageRepository.findByName(language.name);
            if (existingLanguage) {
                throw new Error(`Language with name ${input} already exists.`);
            }
            const result = await this.languageRepository.save(language);
            return result;
        } catch (error) {
            console.error("Error creating language:", error);
            throw new Error(`Failed to create language: ${error}`);
        }
    }
}
