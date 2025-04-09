import mongoose, { Schema } from 'mongoose';
import IReview from '../../application/ReviewModel';

const ReviewAnswerSchema = new Schema({
  id: { type: Number, required: true },
  answer: { type: Boolean, required: true },
  comment: { type: String, required: true },
});

const ReviewSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  questionsId: { type: String, required: true },
  answers: { type: [ReviewAnswerSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);
