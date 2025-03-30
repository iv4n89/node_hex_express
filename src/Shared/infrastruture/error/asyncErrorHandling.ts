/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction } from 'express';

export const asyncError =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
