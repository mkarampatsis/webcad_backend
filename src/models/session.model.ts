import { Schema, model } from 'mongoose';

export interface ISession extends Document {
  userId: string;
  email: string;
  containerName: string;
  hostPort: number;
  folderPath: string;
  status: string;
  startedAt: Date;
  lastActivityAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    // userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: String, ref: 'User', required: true },
    email: { type: String, required: true },  
    containerName: { type: String, required: true },
    hostPort: { type: Number, required: true },
    folderPath: { type: String, required: true },
    startedAt: { type: Date, default: Date.now },
    lastActivityAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['running', 'stopped'], default: 'running' }
  },
  { timestamps: true }
);

export default model<ISession>("Session", sessionSchema);