import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export function requireUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ status:false, message: 'Unauthorized' });
  }

  const token = authHeader.slice(7);
  
  try {
    const payload = jwt.verify(token, config.jwtSecret) as { userId: string };
    (req as any).userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ status:false, message: 'Invalid token' });
  }
}
