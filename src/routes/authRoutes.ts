import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { User } from '../models/User';

const router = Router();

/**
 * POST /auth/google
 * For now: expects { googleId, email, name }
 * Later: you’ll verify Google ID token here.
 */
router.post('/google', async (req, res, next) => {
  try {
    const { googleId, email, name } = req.body;

    if (!googleId) {
      return res.status(400).json({ error: 'googleId is required' });
    }

    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({ googleId, email, name });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), googleId: user.googleId },
      config.jwtSecret,
      { expiresIn: '8h' }
    );

    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    next(err);
  }
});

export default router;
