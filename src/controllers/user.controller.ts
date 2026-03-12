import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existing = await userService.findUserByEmail(req.body.email);
    if (existing) return res.status(400).json({ status: false, message: 'User exists' });
    const created = await userService.createUser(req.body);
    res.status(201).json({ status: true, message: 'User created successfully' });
  } catch (err) { next(err); }
};
