import ExistsUserUseCase from "../../../../src/User/application/useCases/existsUser";
import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";
import { UserMother } from "../../domain/model/UserMother";
import { UserIdMother } from "../../domain/valueObject/UserIdMother";

let repository: UserRepositoryMock;
let existsUserUseCase: ExistsUserUseCase;

beforeEach(() => {
  repository = new UserRepositoryMock();
  existsUserUseCase = new ExistsUserUseCase(repository);
});

afterEach(() => {
  repository.reset();
});

describe('ExistsUserUseCase tests', () => {
    it('Should return true when user exists', async () => {
        // Arrange
        const user = UserMother.generate();
        await repository.save(user);
        const userId = user.id;
    
        // Act
        const result = await existsUserUseCase.execute(userId.getValue());
    
        // Assert
        expect(result).toBe(true);
        expect(repository.existsSpy).toHaveBeenCalledTimes(1);
        expect(repository.existsSpy).toHaveBeenCalledWith(userId);
    });
    
    it('Should return false when user does not exist', async () => {
        // Arrange
        const userId = UserIdMother.generate();
        repository.setShouldFailExists(true);
    
        // Act
        const result = await existsUserUseCase.execute(userId.getValue());
    
        // Assert
        expect(result).toBe(false);
        expect(repository.existsSpy).toHaveBeenCalledTimes(1);
        expect(repository.existsSpy).toHaveBeenCalledWith(userId);
    });
});
