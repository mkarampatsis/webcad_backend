import { Router } from 'express';
import { requireUser } from '../middleware/authMiddleware';
import { ensureUserFolder } from '../utils/fsUtils';
import { allocatePort } from '../utils/portAllocator';
import { startStudentContainer, stopStudentContainer } from '../docker/dockerService';
import { Session } from '../models/Session';

const router = Router();

// POST /session/start
router.post('/start', requireUser, async (req, res, next) => {
  try {
    const userId = (req as any).userId as string;

    const folderPath = ensureUserFolder(userId);
    const hostPort = allocatePort();

    const containerName = await startStudentContainer(userId, hostPort, folderPath);

    const session = await Session.create({
      userId,
      containerName,
      hostPort,
      folderPath
    });

    const url = `http://${req.hostname}:${hostPort}/vnc_lite.html?autoconnect=1&resize=scale`;

    res.json({ sessionId: session._id, url });
  } catch (err) {
    next(err);
  }
});

// POST /session/stop
router.post('/stop', requireUser, async (req, res, next) => {
  try {
    const userId = (req as any).userId as string;
    const { sessionId } = req.body;

    const session = await Session.findOne({ _id: sessionId, userId });
    if (!session) return res.status(404).json({ error: 'Session not found' });

    await stopStudentContainer(session.containerName);
    session.status = 'stopped';
    await session.save();

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
