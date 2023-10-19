import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  payment: {
    type: Number,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
},
{ timestamps: true });
export const TransactionModel = model("Transaction", TransactionSchema);