import express from 'express';
import cookieParser from 'cookie-parser';
import sessionRoutes from './routes/sessionRoutes';
import uploadRoutes from './routes/uploadRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/session', sessionRoutes);
app.use('/upload', uploadRoutes);

app.use(errorHandler);

export default app;
