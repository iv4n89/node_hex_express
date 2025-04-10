import User from "../../../../src/User/domain/models/User";
import { UserEmailMother } from "../valueObject/UserEmailMother";
import { UserIdMother } from "../valueObject/UserIdMother";
import { UserNameMother } from "../valueObject/UserNameMother"

describe('User tests', () => {
    it('Should create a valid user', () => {
        // Arrange
        const id = UserIdMother.generate();
        const name = UserNameMother.generate();
        const email = UserEmailMother.generate();

        // Act
        const user = User.create(id, name, email);

        // Assert
        expect(user).toBeInstanceOf(User);
        expect(user.id).toEqual(id);
        expect(user.name).toEqual(name);
        expect(user.email).toEqual(email);
    });

    it('Should create a valid user from primitives', () => {
        // Arrange
        const id = UserIdMother.generate().getValue();
        const name = UserNameMother.generate().getValue();
        const email = UserEmailMother.generate().getValue();

        // Act
        const user = User.createFromPrimitives({
            id,
            name,
            email
        });

        // Assert
        expect(user).toBeInstanceOf(User);
        expect(user.id.getValue()).toEqual(id);
        expect(user.name.getValue()).toEqual(name);
        expect(user.email.getValue()).toEqual(email);
    });

    it('Should create a valid user without id', () => {
        // Arrange
        const name = UserNameMother.generate();
        const email = UserEmailMother.generate();

        // Act
        const user = User.createWithoutId(name.getValue(), email.getValue());

        // Assert
        expect(user).toBeInstanceOf(User);
        expect(user.name).toEqual(name);
        expect(user.email).toEqual(email);
    });

    it('Should return user as primitives', () => {
        // Arrange
        const id = UserIdMother.generate();
        const name = UserNameMother.generate();
        const email = UserEmailMother.generate();

        // Act
        const user = User.create(id, name, email);
        const primitives = user.toPrimitives();

        // Assert
        expect(primitives).toEqual({
            id: id.getValue(),
            name: name.getValue(),
            email: email.getValue()
        });
        expect(primitives.id).toEqual(user.id.getValue());
        expect(primitives.name).toEqual(user.name.getValue());
        expect(primitives.email).toEqual(user.email.getValue());
    })
    
})
