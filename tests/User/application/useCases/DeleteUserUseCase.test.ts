import DeleteUserUseCase from "../../../../src/User/application/useCases/deleteUser";
import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";
import { UserMother } from "../../domain/model/UserMother";
import { UserIdMother } from "../../domain/valueObject/UserIdMother";

let repository: UserRepositoryMock;
let deleteUserUseCase: DeleteUserUseCase;

beforeEach(() => {
  repository = new UserRepositoryMock();
  deleteUserUseCase = new DeleteUserUseCase(repository);
});

afterEach(() => {
  repository.reset();
});

describe('DeleteUserUseCase tests', () => {
    it('Should delete a user', async () => {
        // Arrange
        const user = UserMother.generate();
        await repository.save(user);
        const userId = user.id;
    
        // Act
        const result = await deleteUserUseCase.execute(userId.getValue());
    
        // Assert
        expect(result).toEqual(true);
        expect(repository.deleteSpy).toHaveBeenCalledTimes(1);
        expect(repository.deleteSpy).toHaveBeenCalledWith(userId);
    });
    
    it('Should return false if something fail', async () => {
        // Arrange
        const userId = UserIdMother.generate();
    
        // Act 
        const result = await deleteUserUseCase.execute(userId.getValue());

        // Assert
        expect(result).toEqual(false);
        expect(repository.deleteSpy).toHaveBeenCalledTimes(1);
        expect(repository.deleteSpy).toHaveBeenCalledWith(userId);
    });
});
