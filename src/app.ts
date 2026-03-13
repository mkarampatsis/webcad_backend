import express from 'express';
import cookieParser from 'cookie-parser';
import sessionRoutes from './routes/sessionRoutes';
import uploadRoutes from './routes/uploadRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(cors({ origin: ['http://localhost:4200', 'https://webcad.duckdns.org'], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//   // origin: '*'
//   origin: ['http://localhost:4200']
// }));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/session', sessionRoutes);
app.use('/upload', uploadRoutes);

app.use(errorHandler);

export default app;
