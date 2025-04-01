import jwt from 'jsonwebtoken';
import { ValueObject } from '../../../Shared/domain/valueObject/ValueObject';

export default class Token extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  override validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('Token must be a non-empty string.');
    }
  }

  public static create(value: string): Token {
    return new Token(value);
  }

  public static generate(payload: Record<string, unknown>): Token {
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secretKey as string, {
      expiresIn: Number(process.env.JWT_EXPIRATION || 72) * 60 * 60,
    });
    return new Token(token);
  }

  public static verify(token: string): Record<string, unknown> | null {
    try {
      const secretKey = process.env.JWT_SECRET;
      return jwt.verify(token, secretKey as string) as Record<string, unknown>;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }
}
