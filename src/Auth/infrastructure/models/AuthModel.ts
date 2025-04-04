import mongoose, { Schema } from 'mongoose';
import { IAuthModel } from '../../application/AuthModel';

const AuthSchema = new Schema({
  id: { type: String, require: true, unique: true },
  userId: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const AuthModel = mongoose.model<IAuthModel>('Auth', AuthSchema);
