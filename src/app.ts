import express from 'express';
import cookieParser from 'cookie-parser';
import sessionRoutes from './routes/sessionRoutes';
import uploadRoutes from './routes/uploadRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  // origin: '*'
  origin: ['http://localhost:4200']
}));

app.use('/auth', authRoutes);
app.use('/session', sessionRoutes);
app.use('/upload', uploadRoutes);

app.use(errorHandler);

export default app;
