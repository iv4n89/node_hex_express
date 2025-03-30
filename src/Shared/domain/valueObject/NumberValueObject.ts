import { ValueObject } from './ValueObject';

export abstract class NumberValueObject extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensureIsValidNumber(value);
    }

    private ensureIsValidNumber(value: number): void {
        if (isNaN(value)) {
            throw new Error('The value must be a valid number.');
        }
    }
}
