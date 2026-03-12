import { Request, Response, NextFunction } from 'express';
import * as sessionService from '../services/session.service';

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionData } = req.body;
    const result = await sessionService.createSession(sessionData, req.hostname);
    if (!result.status) return res.status(400).json({ status: false, message: "Failed to create session" });
    res.status(201).json({ status: true, sessionId: result.sessionId, url: result.url, message: 'Session created' });
  } 
  catch (err) { next(err); }
};

export const stopSession = async (req: Request, res: Response, next: NextFunction) => {     
  try {
    const { sessionId } = req.params;
    console.log(`Stopping session ${sessionId}`);
    // const result = await sessionService.stopSession(sessionId);
    // if (!result.status) return res.status(400).json({ status: false, message: "Failed to stop session" });
    // res.status(200).json({ status: true, message: 'Session stopped' });
  } 
  catch (err) { next(err); }
}