import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { User } from '../models/User';

import * as authCtrl from 'src/controllers/auth.controller'

const router = Router();

/**
 * POST /auth/google
 * For now: expects { googleId, email, name }
 * Later: you’ll verify Google ID token here.
 */
router.get('/google', authCtrl.googleLogin);
router.post('/register', authCtrl.register);
router.get('/me', authCtrl.me);
// router.get('/google', async (req, res, next) => {
//   console.log('Received Google auth request:', req.body);
//   console.log('Query parameters:', req.query);
//   try {
//     const { googleId, email, name } = req.body;

//     if (!googleId) {
//       return res.status(400).json({ error: 'googleId is required' });
//     }

//     let user = await User.findOne({ googleId });
//     if (!user) {
//       user = await User.create({ googleId, email, name });
//     }

//     const token = jwt.sign(
//       { userId: user._id.toString(), googleId: user.googleId },
//       config.jwtSecret,
//       { expiresIn: '8h' }
//     );

//     res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
//   } catch (err) {
//     next(err);
//   }
// });

export default router;
