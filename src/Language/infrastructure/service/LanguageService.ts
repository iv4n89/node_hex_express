import ILanguageModel from "../../application/LanguageModel";
import ILanguageService from "../../application/service/LanguageService";
import CreateLanguageUseCase from "../../application/useCases/CreateLanguageUseCase";
import DeleteLanguageUseCase from "../../application/useCases/DeleteLanguageUseCase";
import GetAllLanguagesUseCase from "../../application/useCases/GetAllLanguagesUseCase";
import GetLanguageByIdUseCase from "../../application/useCases/GetLanguageByIdUseCase";
import GetLanguageByNameUseCase from "../../application/useCases/GetLanguageByNameUseCase";
import UpdateLanguageUseCase from "../../application/useCases/UpdateLanguageUseCase";
import LanguageRepository from "../repository/LanguageRepository";
import toMongoModel from "../toMongoModel";

export default class LanguageService implements ILanguageService {
    private readonly createLanguageUseCase: CreateLanguageUseCase;
    private readonly getLanguageByIdUseCase: GetLanguageByIdUseCase;
    private readonly getLanguageByNameUseCase: GetLanguageByNameUseCase;
    private readonly getAllLanguagesUseCase: GetAllLanguagesUseCase;
    private readonly deleteLanguageUseCase: DeleteLanguageUseCase;
    private readonly updateLanguageUseCase: UpdateLanguageUseCase;

    constructor() {
        const languageRepository = new LanguageRepository();
        this.createLanguageUseCase = new CreateLanguageUseCase(languageRepository);
        this.getLanguageByIdUseCase = new GetLanguageByIdUseCase(languageRepository);
        this.getLanguageByNameUseCase = new GetLanguageByNameUseCase(languageRepository);
        this.getAllLanguagesUseCase = new GetAllLanguagesUseCase(languageRepository);
        this.deleteLanguageUseCase = new DeleteLanguageUseCase(languageRepository);
        this.updateLanguageUseCase = new UpdateLanguageUseCase(languageRepository);
    }

    async create(name: string): Promise<boolean> {
        try {
            return await this.createLanguageUseCase.execute(name);
        } catch (error) {
            console.error("Error creating language:", error);
            throw new Error(`Failed to create language: ${error}`);
        }
    }

    async getById(id: string): Promise<ILanguageModel | null> {
        try {
            const result = await this.getLanguageByIdUseCase.execute(id);
            return toMongoModel(result);
        } catch (error) {
            console.error("Error fetching language by ID:", error);
            throw new Error(`Failed to fetch language by ID: ${error}`);
        }
    }

    async getByName(name: string): Promise<ILanguageModel | null> {
        try {
            const result = await this.getLanguageByNameUseCase.execute(name);
            return toMongoModel(result);
        } catch (error) {
            console.error("Error fetching language by name:", error);
            throw new Error(`Failed to fetch language by name: ${error}`);
        }
    }

    async getAll(): Promise<ILanguageModel[]> {
        try {
            const result = await this.getAllLanguagesUseCase.execute();
            return result.map(toMongoModel);
        } catch (error) {
            console.error("Error fetching all languages:", error);
            throw new Error(`Failed to fetch all languages: ${error}`);
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            return await this.deleteLanguageUseCase.execute(id);
        } catch (error) {
            console.error("Error deleting language:", error);
            throw new Error(`Failed to delete language: ${error}`);
        }
    }

    async update(id: string, name: string): Promise<boolean> {
        try {
            return await this.updateLanguageUseCase.execute({ id, name });
        } catch (error) {
            console.error("Error updating language:", error);
            throw new Error(`Failed to update language: ${error}`);
        }
    }
}
