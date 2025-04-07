import ILanguageModel from "../application/LanguageModel";
import Language from "../domain/model/Lenguage";

export default function toMongoModel(data: Language): ILanguageModel {
    return data.toPrimitives() as ILanguageModel;
}
