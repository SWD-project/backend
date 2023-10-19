import { Schema, model } from "mongoose";

const CartSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sessionId: {
    type: String,
  },
  
}, { timestamps: true });
export const CartModel = model("Cart", CartSchema);
