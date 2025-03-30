import { ValueObject } from './ValueObject';

export abstract class StringValueObject extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureIsValidString(value);
    }

    private ensureIsValidString(value: string): void {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('The value must be a non-empty string.');
        }
    }

    toString(): string {
        return this.value;
    }
}
