import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import * as sessionCtrl from '../controllers/session.controller';

const router = Router();

// GET /session/email/:email
router.get('/email/:email', authenticate, sessionCtrl.getSessionByEmail);

// POST /session/start
router.post('/start', authenticate, sessionCtrl.createSession);

// POST /session/stop
router.post('/stop', authenticate, sessionCtrl.stopSession);

export default router;
