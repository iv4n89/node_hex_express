import UseCaseBase from "../../../Shared/application/UseCaseBase";
import Language from "../../domain/model/Lenguage";
import ILanguageRepository from "../../domain/repository/LanguageRepository";
import LanguageId from "../../domain/valueObject/LanguageId";

export default class GetLanguageByIdUseCase extends UseCaseBase<string, Language> {
    constructor(private readonly languageRepository: ILanguageRepository) { super(); }

    override async execute(input: string): Promise<Language> {
        try {
            const languageId = LanguageId.create(input);
            const language = await this.languageRepository.findById(languageId);
            if (!language) {
                throw new Error(`Language with ID ${input} not found.`);
            }
            return language;
        } catch (error) {
            console.error("Error fetching language by ID:", error);
            throw new Error(`Failed to fetch language by ID: ${error}`);
        }
    }
}
