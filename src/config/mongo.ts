import mongoose from 'mongoose';
import { config } from './env';

mongoose
  .connect(config.mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));
