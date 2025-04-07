import Language from "../../domain/model/Lenguage";
import ILanguageRepository from "../../domain/repository/LanguageRepository";
import LanguageId from "../../domain/valueObject/LanguageId";
import LanguageName from "../../domain/valueObject/LanguageName";
import { LanguageModel } from "../model/LanguageModel";
import toDomainModel from "../toDomainModel";
import toMongoModel from "../toMongoModel";

export default class LanguageRepository implements ILanguageRepository {
    constructor() {}

    async save(language: Language): Promise<boolean> {
        try {
            const model = toMongoModel(language);
            const newLanguage = await LanguageModel.create(model);
            const result = await newLanguage.save();
            return !!result;
        } catch (error) {
            console.error("Error saving language:", error);
            throw new Error(`Failed to save language: ${error}`);
        }
    }

    async findById(id: LanguageId): Promise<Language | null> {
        try {
            const result = await LanguageModel.findOne({id: id.getValue()});
            if (!result) {
                return null;
            }
            return toDomainModel(result);
        } catch (error) {
            console.error("Error finding language by ID:", error);
            throw new Error(`Failed to find language by ID: ${error}`);
        }
    }

    async findByName(name: LanguageName): Promise<Language | null> {
        try {
            const result = await LanguageModel.findOne({name: name.getValue()});
            if (!result) {
                return null;
            }
            return toDomainModel(result);
        } catch (error) {
            console.error("Error finding language by name:", error);
            throw new Error(`Failed to find language by name: ${error}`);
        }
    }

    async findAll(): Promise<Language[]> {
        try {
            const result = await LanguageModel.find();
            return result.map(toDomainModel);
        } catch (error) {
            console.error("Error finding all languages:", error);
            throw new Error(`Failed to find all languages: ${error}`);
        }
    }

    async delete(id: LanguageId): Promise<boolean> {
        try {
            const result = await LanguageModel.deleteOne({id: id.getValue()});
            return result.deletedCount === 1;
        } catch (error) {
            console.error("Error deleting language:", error);
            throw new Error(`Failed to delete language: ${error}`);
        }
    }

    async update(language: Language): Promise<boolean> {
        try {
            const id = language.id;
            const existingLanguage = await LanguageModel.findOne({id: id.getValue()});
            if (!existingLanguage) {
                throw new Error(`Language with ID ${id.getValue()} not found.`);
            }
            const updatedLanguage = toMongoModel(language);
            const result = await LanguageModel.updateOne({id: id.getValue()}, updatedLanguage);
            return result.modifiedCount === 1;
        } catch (error) {
            console.error("Error updating language:", error);
            throw new Error(`Failed to update language: ${error}`);
        }
    }
}
