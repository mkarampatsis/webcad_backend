import { Request, Response, NextFunction } from 'express';
import * as sessionService from '../services/session.service';

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionData } = req.body;
    const result = await sessionService.createSession(sessionData, req.hostname);
    if (!result.status) return res.status(400).json({ status: false, message: result.message });
    res.status(201).json({ status: true, sessionId: result.sessionId });
  } 
  catch (err) { next(err); }
};

export const stopSession = async (req: Request, res: Response, next: NextFunction) => {     
  try {
    const { sessionId } = req.params;
    const result = await sessionService.stopSession(sessionId);
    if (!result.status) return res.status(400).json({ status: false, message: result.message });
    res.status(200).json({ status: true, message: 'Session stopped' });
  } 
  catch (err) { next(err); }
}