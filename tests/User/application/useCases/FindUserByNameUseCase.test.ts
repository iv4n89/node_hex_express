import FindUserByNameUseCase from "../../../../src/User/application/useCases/findUserByName";
import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";
import { UserMother } from "../../domain/model/UserMother";
import { UserNameMother } from "../../domain/valueObject/UserNameMother";

let repository: UserRepositoryMock;
let findUserByNameUseCase: FindUserByNameUseCase;

beforeEach(() => {
  repository = new UserRepositoryMock();
  findUserByNameUseCase = new FindUserByNameUseCase(repository);
});

afterEach(() => {
  repository.reset();
});

describe('FindUserByNameUseCase tests', () => {
    it('Should find a user by name', async () => {
        // Arrange
        const user = UserMother.generate();
        await repository.save(user);
        const savedUser = await repository.findLastSaved();
        const name = user?.name;
    
        // Act
        const result = await findUserByNameUseCase.execute(name.getValue());
    
        // Assert
        expect(result).toEqual(savedUser);
        expect(repository.findByNameSpy).toHaveBeenCalledTimes(1);
        expect(repository.findByNameSpy).toHaveBeenCalledWith(name);
    });
    
    it('Should return null when user is not found', async () => {
        // Arrange
        const nonExistentName = UserNameMother.create('nonexistent');
    
        // Act
        const result = await findUserByNameUseCase.execute(nonExistentName.getValue());
    
        // Assert
        expect(result).toBeNull();
        expect(repository.findByNameSpy).toHaveBeenCalledTimes(1);
        expect(repository.findByNameSpy).toHaveBeenCalledWith(nonExistentName);
    });
    }
);
