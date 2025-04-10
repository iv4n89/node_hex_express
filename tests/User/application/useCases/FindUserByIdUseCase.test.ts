import FindUserByIdUseCase from '../../../../src/User/application/useCases/findUserById';
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock';
import { UserMother } from '../../domain/model/UserMother';
import { UserIdMother } from '../../domain/valueObject/UserIdMother';

let repository: UserRepositoryMock;
let findUserByIdUseCase: FindUserByIdUseCase;

beforeEach(() => {
  repository = new UserRepositoryMock();
  findUserByIdUseCase = new FindUserByIdUseCase(repository);
});

afterEach(() => {
  repository.reset();
});

describe('FindUserByIdUseCase tests', () => {
  it('Should find a user by id', async () => {
    // Arrange
    await repository.save(UserMother.generate());
    const savedUser = await repository.findLastSaved();

    // Act
    const result = await findUserByIdUseCase.execute(
      savedUser?.id.getValue() as string
    );

    // Assert
    expect(result).toEqual(savedUser);
    expect(repository.findByIdSpy).toHaveBeenCalledTimes(1);
    expect(repository.findByIdSpy).toHaveBeenCalledWith(savedUser?.id);
  });

  it('Should return null when user is not found', async () => {
    // Arrange
    const nonExistentId = UserIdMother.generate();

    // Act
    const result = await findUserByIdUseCase.execute(nonExistentId.getValue());

    // Assert
    expect(result).toBeNull();
    expect(repository.findByIdSpy).toHaveBeenCalledTimes(1);
    expect(repository.findByIdSpy).toHaveBeenCalledWith(nonExistentId);
  });

  it('Should throw an error when id is invalid', async () => {
    // Arrange
    const invalidId = 'invalid-id';

    // Act & Assert
    await expect(findUserByIdUseCase.execute(invalidId)).rejects.toThrow(
      'Invalid UUID format'
    );
  });

  it('Should throw an error when id is empty', async () => {
    // Arrange
    const emptyId = '';

    // Act & Assert
    await expect(findUserByIdUseCase.execute(emptyId)).rejects.toThrow(
      'Invalid UUID format'
    );
  });
});
