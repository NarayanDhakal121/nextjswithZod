// The schema written here through mongoose is for mongodb. 
import mongoose, { Schema, Document } from "mongoose"; // for typescript

// interface

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifiedCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
    match: [
      /(^|\s|\W)([\w\-\.+]+@[\w\-\.]+\.[A-Za-z]{2,})/,
      "please use a valid email address",
    ],
  },

  password: {
    type: String,
    required: [true, "email is required"],
  },

  verifiedCode: {
    type: String,
    required: [true, "Verify code is required"],
  },

  verifyCodeExpiry: {
    tpe: String,
    required: [true, "Verify code Expiry is required"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },

  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
