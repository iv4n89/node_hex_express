import UserName from "../../../../src/User/domain/valueObject/UserName";

describe('UserName tests', () => {
    it('Should create a valid UserName', () => {
        // Arrange
        const value = 'John Doe';

        // Act
        const userName = UserName.create(value);

        // Assert
        expect(userName.getValue()).toBe(value);
    });

    it('Should throw an error when creating UserName with invalid value', () => {
        // Arrange
        const invalidValue = '';

        // Act & Assert
        expect(() => UserName.create(invalidValue)).toThrow('The value must be a non-empty string.');
    });
})
