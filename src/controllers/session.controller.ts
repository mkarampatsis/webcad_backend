import { Request, Response, NextFunction } from 'express';
import * as sessionService from '../services/session.service';
import * as sessionDao from '../dao/session.dao'; 
import { CreateSessionDTO } from '../dto/user.dto';

export const getSessionByEmail = async (req: Request, res: Response, next: NextFunction) => {     
  try {
    const { email } = req.params;
    console.log(`Get session by email ${email}`);
    
    if (typeof email!=='string') {
      return res.status(400).json({ status: false, message: "Invalid email address" });
    } 
    
    const result = await sessionService.startSession(email);
    if (!result.status) return res.status(400).json({ status: false, message: "Failed to find session" });
    res.status(201).json({ status: result.status, sessionId: result.sessionId, url: result.url, message: result.message });
  } 
  catch (err) { next(err); }
}

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionData: CreateSessionDTO = req.body;
    console.log('Creating session with data:', sessionData);
    const result = await sessionService.createSession(sessionData);
    if (!result.status) 
      return res.status(400).json({ status: false, message: "Failed to create session" });
    res.status(201).json({ status: result.status, sessionId: result.sessionId, url: result.url, message: result.message });
  } 
  catch (err) { 
    next(err); 
  }
};

export const stopSession = async (req: Request, res: Response, next: NextFunction) => {     
  try {
    const { sessionId } = req.params;
    console.log(`Stopping session ${sessionId}`);
    
    if (typeof sessionId!=='string') {
      return res.status(400).json({ status: false, message: "Invalid session ID" });
    } 

    const result = await sessionService.stopSession(sessionId);
    if (!result.status) return res.status(400).json({ status: false, message: "Failed to stop session" });
    res.status(200).json({ status: true, message: 'Session stopped' });
  } 
  catch (err) { next(err); }
}