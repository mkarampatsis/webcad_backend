import express from 'express';
import cookieParser from 'cookie-parser';
import { performance } from 'perf_hooks';
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

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/session', sessionRoutes);
app.use('/upload', uploadRoutes);

app.get('/health', async (req, res) => {
  // Measure event loop delay
  const start = performance.now();
  await new Promise(resolve => setImmediate(resolve));
  const eventLoopDelay = performance.now() - start;

  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
    memory: process.memoryUsage(),
    eventLoopDelay
  });
});

app.use(errorHandler);

export default app;
