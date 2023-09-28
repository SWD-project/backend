import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});
export const RoleModel = model("Role", RoleSchema);
