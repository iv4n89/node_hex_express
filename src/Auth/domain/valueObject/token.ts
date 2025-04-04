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

  public static verify(token: string, { userId }: { userId: string }): boolean {
    try {
      const secretKey = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secretKey as string) as Record<
        string,
        unknown
      >;
      if (decoded.userId !== userId) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  }

  public static getPayload(token: string): { userId: string } | null {
    try {
      const secretKey = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secretKey as string) as Record<
        string,
        unknown
      >;
      return { userId: decoded.userId as string };
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }
}
