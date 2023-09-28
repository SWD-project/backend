import { Schema, model } from "mongoose";

const CartSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sessionId: {
    type: Schema.Types.ObjectId,
    ref: "",
  },
  column: {
    type: Number,
    require: true,
  },
});
export const CartModel = model("Cart", CartSchema);
