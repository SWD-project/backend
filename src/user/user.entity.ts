import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    birthDate: {
        type: String,
        require: true
    }
    ,
    roleId: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    uuid: {
        type: String,
        unique: true,
        require: true
    },

}, {timestamps: true});

export const UserModel = model("User", UserSchema)
