import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../application/UserModel';

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
