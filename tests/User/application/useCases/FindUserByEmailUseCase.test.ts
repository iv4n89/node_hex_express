import FindUserByEmailUseCase from '../../../../src/User/application/useCases/findUserByEmail';
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock';
import { UserMother } from '../../domain/model/UserMother';
import { UserEmailMother } from '../../domain/valueObject/UserEmailMother';

let repository: UserRepositoryMock;
let findUserByEmailUseCase: FindUserByEmailUseCase;

beforeEach(() => {
  repository = new UserRepositoryMock();
  findUserByEmailUseCase = new FindUserByEmailUseCase(repository);
});

afterEach(() => {
  repository.reset();
});

describe('FindUserByEmailUseCase tests', () => {
  it('Should find a user by email', async () => {
    // Arrange
    await repository.save(UserMother.generate());
    const savedUser = await repository.findLastSaved();

    // Act
    const result = await findUserByEmailUseCase.execute(
      savedUser?.email.getValue() as string
    );

    // Assert
    expect(result).toEqual(savedUser);
    expect(repository.findByEmailSpy).toHaveBeenCalledTimes(1);
    expect(repository.findByEmailSpy).toHaveBeenCalledWith(savedUser?.email);
  });

  it('Should return null when user is not found', async () => {
    // Arrange
    const nonExistingEmail = UserEmailMother.generate();

    // Act
    const result = await findUserByEmailUseCase.execute(
      nonExistingEmail.getValue()
    );

    // Assert
    expect(result).toBeNull();
    expect(repository.findByEmailSpy).toHaveBeenCalledTimes(1);
    expect(repository.findByEmailSpy).toHaveBeenCalledWith(nonExistingEmail);
  })
});
