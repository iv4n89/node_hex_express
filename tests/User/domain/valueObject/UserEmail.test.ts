import UserEmail from "../../../../src/User/domain/valueObject/UserEmail";
import { MotherCreator } from "../../../Shared/domain/MotherCreator";

describe('UserEmail tests', () => {
    it('Should create a valid UserEmail', () => {
        // Arrange
        const email = MotherCreator.random().internet.email();

        // Act
        const userEmail = UserEmail.create(email);

        // Assert
        expect(userEmail.getValue()).toBe(email);
    });

    it('Should fail when creating UserEmail with invalid value', () => {
        // Arrange
        const invalidEmail = 'invalid-email';

        // Act & Assert
        expect(() => UserEmail.create(invalidEmail)).toThrow('Invalid email format');
    });

    it('Should fail when creating UserEmail with empty value', () => {
        // Arrange
        const emptyEmail = '';

        // Act & Assert
        expect(() => UserEmail.create(emptyEmail)).toThrow('Email cannot be empty');
    });

    it('Should fail when creating UserEmail with a whitespace value', () => {
        // Arrange
        const email = '            ';

        // Act & Assert
        expect(() => UserEmail.create(email)).toThrow('Invalid email format');
    });

    it('Should fail if email is less than 5 characters', () => {
        // Arrange
        const shortEmail = 'a@b';

        // Act & Assert
        expect(() => UserEmail.create(shortEmail)).toThrow('Email must be between 5 and 50 characters long');
    });

    it('Should fail if email is more than 50 characters', () => {
        // Arrange
        const longEmail = 'a'.repeat(51) + '@example.com';

        // Act & Assert
        expect(() => UserEmail.create(longEmail)).toThrow('Email must be between 5 and 50 characters long');
    });

    it('Should fail if email has a whitespace', () => {
        // Arrange
        const emailWithWhitespace = 'user@ example.com';

        // Act & Assert
        expect(() => UserEmail.create(emailWithWhitespace)).toThrow('Invalid email format');
    });
})
