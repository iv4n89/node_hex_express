import UpdateUserUseCase from '../../../../src/User/application/useCases/updateUser';
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock';
import { UserMother } from '../../domain/model/UserMother';
import { UserEmailMother } from '../../domain/valueObject/UserEmailMother';
import { UserIdMother } from '../../domain/valueObject/UserIdMother';

let repository: UserRepositoryMock;
let updateUserUseCase: UpdateUserUseCase;

beforeEach(() => {
  repository = new UserRepositoryMock();
  updateUserUseCase = new UpdateUserUseCase(repository);
});

afterEach(() => {
  repository.reset();
});

describe('UpdateUserUseCase tests', () => {
  it('Should update email of an existing user', async () => {
    // Arrange
    const user = UserMother.generate();
    const newEmail = UserEmailMother.generate();
    await repository.save(user);
    const userId = user.id;

    // Act
    const result = await updateUserUseCase.execute(
      userId.getValue(),
      user.name.getValue(),
      newEmail.getValue()
    );
    const updatedUser = await repository.findById(userId);

    // Assert
    expect(result).toEqual(true);
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.email).toEqual(newEmail);
    expect(repository.updateSpy).toHaveBeenCalledTimes(1);
    expect(repository.updateSpy).toHaveBeenCalledWith(
      UserMother.create(
        userId.getValue(),
        user.name.getValue(),
        newEmail.getValue()
      )
    );
  });

  it('Should update name of an existing user', async () => {
    // Arrange
    const user = UserMother.generate();
    const newName = user.name.getValue() + ' Updated';
    await repository.save(user);
    const userId = user.id;

    // Act
    const result = await updateUserUseCase.execute(
      userId.getValue(),
      newName,
      user.email.getValue()
    );
    const updatedUser = await repository.findById(userId);

    // Assert
    expect(result).toEqual(true);
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.name.getValue()).toEqual(newName);
    expect(repository.updateSpy).toHaveBeenCalledTimes(1);
    expect(repository.updateSpy).toHaveBeenCalledWith(
      UserMother.create(userId.getValue(), newName, user.email.getValue())
    );
  });

  it('Should return false when user does not exist', async () => {
    // Arrange
    const userId = UserIdMother.generate();
    const newEmail = UserEmailMother.generate();

    // Act
    const result = await updateUserUseCase.execute(
      userId.getValue(),
      'newName',
      newEmail.getValue()
    );

    // Assert
    expect(result).toEqual(false);
    expect(repository.updateSpy).not.toHaveBeenCalled();
  });
});
