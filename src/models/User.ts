import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: String,
  name: String
});

export const User = model('User', userSchema);
