import { SaveUser } from "../../../../src/User/application/useCases/saveUser";
import User from "../../../../src/User/domain/models/User";
import { UUIDMother } from "../../../Shared/domain/UUIDMother";
import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock"
import { UserMother } from "../../domain/model/UserMother";

let repository: UserRepositoryMock;
let createUserUseCase: SaveUser;

beforeEach(() => {
    repository = new UserRepositoryMock();
    createUserUseCase = new SaveUser(repository);
});

afterEach(() => {
    repository.reset();
})

describe('CreateUserUseCase tests', () => {
    it('Should create a valid user', async () => {
        // Arrange
        const name = 'Test Name';
        const email = 'test@mail.com';
        const user = UserMother.create(UUIDMother.random(), name, email);

        // Act
        const result = await createUserUseCase.execute(name, email);
        const savedUser = await repository.findLastSaved();

        // Assert
        expect(result).toBe(true);
        expect(repository.saveSpy).toHaveBeenCalledTimes(1);
        expect(repository.saveSpy).toHaveBeenCalledWith(savedUser);
        expect(savedUser).toBeInstanceOf(User);
        expect(savedUser?.name).toEqual(user.name);
        expect(savedUser?.email).toEqual(user.email);
    });

    it('Should fail when user already exists', async () => {
        // Arrange
        const email = 'test@mail.com';
        const user = UserMother.createWithEmail(email);

        // Act
        await createUserUseCase.execute(user.name.getValue(), user.email.getValue());
        repository.setShouldFailSave(true);
        const result = await createUserUseCase.execute(user.name.getValue(), user.email.getValue());

        // Assert
        expect(result).toBe(false);
        expect(repository.saveSpy).toHaveBeenCalledTimes(2);
    });
})
