import { Schema, model } from "mongoose";
const UserSchema = new Schema({
  lectureId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  description:{
    type: String,
    require:true,
  },
  price:{
    type:
  }
});
