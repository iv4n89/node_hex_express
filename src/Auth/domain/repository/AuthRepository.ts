import UserId from "../../../Shared/domain/valueObject/UserId";
import AuthPassword from "../valueObject/authPassword";
import Token from "../valueObject/token";

export default interface IAuthRepository {
    saveCredentials(userId: UserId, password: AuthPassword): Promise<boolean>;
    getToken(userId: UserId, password: AuthPassword): Promise<Token>;
    updatePassword(userId: UserId, password: AuthPassword, newPassword: AuthPassword): Promise<boolean>;
    refreshToken(userId: UserId, token: Token): Promise<Token>;
}
