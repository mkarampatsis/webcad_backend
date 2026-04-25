import { IUser } from 'src/models/user.model';
import Session  from '../models/session.model';
import { ensureUserFolder } from '../utils/fsUtils';
import { allocatePort } from '../utils/portAllocator';
import { startStudentContainer, stopStudentContainer } from './dockerService';
import * as sessionDAO from '../dao/session.dao';
import { CreateSessionDTO } from 'src/dto/user.dto';


const HOSTNAME = process.env.HOSTNAME;

export const createSession = async (payload: CreateSessionDTO) => {
  try {
    const userId = payload.userId;
    const email = payload.email.email;
    
    const folderPath = ensureUserFolder(email);
    const hostPort = allocatePort();
    const containerName = await startStudentContainer(userId, hostPort, folderPath);

    const session = await sessionDAO.createSession({
      userId,
      email,
      containerName,
      hostPort,
      folderPath
    });
    const url = `http://${HOSTNAME}:${hostPort}/vnc_lite.html?autoconnect=1&resize=scale`;
    return { status: true, message: 'Session created', sessionId: session._id, url };
  } catch (err) {
    return { status: false, message: 'Failed to create session' };
  }
}

export const startSession = async (email: string) => {
  try {
    const session = await Session.findOne({ email: email });
    if (!session) return { status: false, message: 'Session not found' };

    if (session.status === 'stopped') {
      session.status = 'running';
      session.lastActivityAt = new Date();
      await session.save();
    }

    const hostPort = session.hostPort;
    const url = `http://${HOSTNAME}:${hostPort}/vnc_lite.html?autoconnect=1&resize=scale`;
    return { status: true, message: 'Session found', sessionId: session._id, url };
  } catch (err) {
    return { status: false, message: 'Failed to find session' };
  }
}  

export const stopSession = async (sessionId: string) => {
  try {
    const session = await Session.findOne({ _id: sessionId });
    if (!session) return { status: false, message: 'Session not found' };

    await stopStudentContainer(session.containerName);
    session.status = 'stopped';
    session.lastActivityAt = new Date();
    await session.save();

    return { status: true, message: 'Session stopped' };
  } catch (err) {
    return { status: false, message: 'Failed to stop session' };
  }
}  