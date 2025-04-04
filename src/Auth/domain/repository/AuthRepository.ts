import UserId from "../../../Shared/domain/valueObject/UserId";
import AuthPassword from "../valueObject/authPassword";
import Token from "../valueObject/token";

export default interface IAuthRepository {
    saveCredentials(userId: UserId, password: AuthPassword): Promise<boolean>;
    getCredentialsByUserId(userId: UserId): Promise<AuthPassword | null>;
    getToken(userId: UserId, password: AuthPassword): Promise<Token>;
    updatePassword(userId: UserId, newPassword: AuthPassword): Promise<boolean>;
    refreshToken(userId: UserId, token: Token): Promise<Token>;
}
