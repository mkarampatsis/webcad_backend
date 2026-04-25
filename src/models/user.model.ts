import { Schema, Types, model } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  email: string;
  name?: string;
  password: string;
  photoUrl?: string;
  roles: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: String,
  password: String,
  photoUrl: String,
  roles: [{ type: Schema.Types.ObjectId, ref: "Role", required: true }]
},
{ timestamps: true }
);

export default model<IUser>("User", userSchema);
