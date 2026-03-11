import { Schema, model } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  email: string;
  name?: string;
  password: string;
  photoUrl?: string;
  roles: string[];
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: String,
  password: String,
  photoUrl: String,
  roles: [{ type: String }]
});

export const User = model('User', userSchema);
