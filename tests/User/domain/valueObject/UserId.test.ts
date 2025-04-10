import UserId from "../../../../src/Shared/domain/valueObject/UserId";
import { UUIDMother } from "../../../Shared/domain/UUIDMother";

describe('UserId Value Object tests', () => {
    it('Should create a valid UserId', () => {
        // Arrange
        const value = UUIDMother.random();

        // Act
        const userId = UserId.create(value);

        // Assert
        expect(userId.getValue()).toBe(value);
    });

    it('Should throw an error when creating UserId with invalid value', () => {
        // Arrange
        const invalidValue = 'invalid-uuid';

        // Act & Assert
        expect(() => UserId.create(invalidValue)).toThrow('Invalid UUID format');
    });
})
