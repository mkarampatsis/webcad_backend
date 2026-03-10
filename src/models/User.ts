import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  email: String,
  name: String,
  photoUrl: String,
  roles: [{ type: String }]
});

export const User = model('User', userSchema);
