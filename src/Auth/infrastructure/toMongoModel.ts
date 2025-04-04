import { IAuthModel } from "../application/AuthModel";
import AuthUser from "../domain/models/AuthUser";

export default function toMongoModel(model: AuthUser): IAuthModel {
    return model.toPrimitives() as IAuthModel;
}
