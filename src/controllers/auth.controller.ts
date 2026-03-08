import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  // try {
  //   const existing = await userService.findUserByUsername(req.body.username);
  //   if (existing) return res.status(400).json({ message: 'User exists' });
  //   const created = await userService.createUser(req.body);
  //   res.status(201).json({ id: created._id, username: created.username });
  // } catch (err) { next(err); }
};

export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    const result = await authService.googleLogin(token);
    if (!result.status) return res.status(401).json({ message: result.message });
    res.status(200).json({ token: result.token, user: result.user });
  } 
  catch (err) { next(err); }
};

export const me = async (req: Request, res: Response, _next: NextFunction) => {
  // console.log("Me>>",req.user);
  // if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  // res.json(req.user);
};
