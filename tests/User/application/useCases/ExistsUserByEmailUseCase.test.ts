import ExistsByEmailUseCase from "../../../../src/User/application/useCases/existsByEmail";
import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";
import { UserMother } from "../../domain/model/UserMother";
import { UserEmailMother } from "../../domain/valueObject/UserEmailMother";

let repository: UserRepositoryMock;
let existsUserByEmailUseCase: ExistsByEmailUseCase;

beforeEach(() => {
  repository = new UserRepositoryMock();
  existsUserByEmailUseCase = new ExistsByEmailUseCase(repository);
});

afterEach(() => {
  repository.reset();
});

describe('ExistsUserByEmailUseCase tests', () => {
    it('Should return true when user exists', async () => {
        // Arrange
        const user = UserMother.generate();
        await repository.save(user);
        const userEmail = user.email;

        // Act
        const result = await existsUserByEmailUseCase.execute(userEmail.getValue());

        // Assert
        expect(result).toBe(true);
        expect(repository.existsByEmailSpy).toHaveBeenCalledTimes(1);
        expect(repository.existsByEmailSpy).toHaveBeenCalledWith(userEmail);
    });

    it('Should return false when user does not exist', async () => {
        // Arrange
        const userEmail = UserEmailMother.generate();
        repository.setShouldFailExistsByEmail(true);

        // Act
        const result = await existsUserByEmailUseCase.execute(userEmail.getValue());

        // Assert
        expect(result).toBe(false);
        expect(repository.existsByEmailSpy).toHaveBeenCalledTimes(1);
        expect(repository.existsByEmailSpy).toHaveBeenCalledWith(userEmail);
    });
});
