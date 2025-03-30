import { ValueObject } from './ValueObject';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';

export class UUIDValueObject extends ValueObject<string> {
    constructor(value?: string) {
        if (!value) {
            value = uuidv4();
        }
        if (!validateUUID(value)) {
            throw new Error('Invalid UUID format');
        }
        super(value);
    }

    static generate(): UUIDValueObject {
        return new UUIDValueObject(uuidv4());
    }
}
