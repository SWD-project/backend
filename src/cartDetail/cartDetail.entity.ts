import { Schema, model } from "mongoose";

const CartDetailSchema = new Schema({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
}, { timestamps: true });
export const CartDetailModel = model("CartDetail", CartDetailSchema);
