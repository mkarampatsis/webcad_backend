import { Router } from 'express';

import * as authCtrl from '../controllers/auth.controller'

const router = Router();

router.post('/google', authCtrl.googleLogin);
router.get('/me', authCtrl.me);

export default router;
