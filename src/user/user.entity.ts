import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    roleId: {
      type: String
    },
    email: {
      type: String,
      require: true,
    },
    uuid: {
      type: String,
      unique: true,
      require: true,
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
