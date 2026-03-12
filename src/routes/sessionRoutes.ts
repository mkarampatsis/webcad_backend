import { Router } from 'express';
import { requireUser } from '../middleware/authMiddleware';
import * as sessionCtrl from '../controllers/session.controller';

const router = Router();

// POST /session/start
router.post('/start', requireUser, sessionCtrl.createSession);

// POST /session/stop
router.post('/stop', requireUser, sessionCtrl.stopSession);

export default router;
