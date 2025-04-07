import UseCaseBase from "../../../Shared/application/UseCaseBase";
import ILanguageRepository from "../../domain/repository/LanguageRepository";
import LanguageId from "../../domain/valueObject/LanguageId";

export default class DeleteLanguageUseCase extends UseCaseBase<string, boolean> {
    constructor(private readonly languageRepository: ILanguageRepository) { super(); }

    override async execute(input: string): Promise<boolean> {   
        try {
            const languageId = LanguageId.create(input);
            const language = await this.languageRepository.findById(languageId);
            if (!language) {
                throw new Error(`Language with ID ${input} not found.`);
            }
            const result = await this.languageRepository.delete(languageId);
            if (!result) {
                throw new Error(`Failed to delete language with ID ${input}.`);
            }
            return result;
        } catch (error) {
            console.error("Error deleting language:", error);
            throw new Error(`Failed to delete language: ${error}`);
        }
    }
}
