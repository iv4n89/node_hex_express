import mongoose, { Schema } from 'mongoose';
import ILanguageModel from '../../application/LanguageModel';

const LanguageSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
});

export const LanguageModel = mongoose.model<ILanguageModel>(
  'Language',
  LanguageSchema
);
