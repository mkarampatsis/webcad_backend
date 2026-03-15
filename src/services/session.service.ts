import { IUser } from 'src/models/User';
import { Session } from '../models/Session';
import { ensureUserFolder } from '../utils/fsUtils';
import { allocatePort } from '../utils/portAllocator';
import { startStudentContainer, stopStudentContainer } from './dockerService';
import dotenv from 'dotenv';

dotenv.config();
const HOSTNAME = process.env.HOSTNAME;

export const createSession = async (user: IUser) => {
  try {
    console.log(`Creating session for user ${user.email}`);
    const folderPath = ensureUserFolder(user.email);
    const hostPort = allocatePort();

    const containerName = await startStudentContainer(user.userId, hostPort, folderPath);

    const session = await Session.create({
      userId: user.userId,
      containerName,
      hostPort,
      folderPath
    });

    const url = `http://${HOSTNAME}:${hostPort}/vnc_lite.html?autoconnect=1&resize=scale`;

    return { status: true, sessionId: session._id, url };
  } catch (err) {
    console.error('Create session error:', err);
    return { status: false, message: 'Failed to create session' };
  }
}

export const stopSession = async (sessionId: string) => {
  try {
    const session = await Session.findOne({ _id: sessionId });
    if (!session) return { status: false, message: 'Session not found' };

    await stopStudentContainer(session.containerName);
    session.status = 'stopped';
    await session.save();

    return { status: true, message: 'Session stopped' };
  } catch (err) {
    return { status: false, message: 'Failed to stop session' };
  }
}  