import mongoose, { Schema } from "mongoose";
import IQuestionModel from "../../application/QuestionModel";

const QuestionSchema = new Schema({
    id: { type: String, required: true, unique: true },
    languageId: { type: String, required: true, unique: true },
    descriptions: { type: [String], required: true, default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const QuestionModel = mongoose.model<IQuestionModel>('Question', QuestionSchema);
