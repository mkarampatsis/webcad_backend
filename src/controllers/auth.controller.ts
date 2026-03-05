import { Request, Response, NextFunction } from 'express';
import * as authService from 'src/services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  // try {
  //   const existing = await userService.findUserByUsername(req.body.username);
  //   if (existing) return res.status(400).json({ message: 'User exists' });
  //   const created = await userService.createUser(req.body);
  //   res.status(201).json({ id: created._id, username: created.username });
  // } catch (err) { next(err); }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  // try {
  //   const { username, password } = req.body;
  //   const result = await authService.login(username, password);
  //   if (!result) return res.status(401).json({ message: 'Invalid credentials' });
  //   res.json({ token: result.token, user: { id: result.user._id, username: result.user.username } });
  // } catch (err) { next(err); }
};

export const me = async (req: Request, res: Response, _next: NextFunction) => {
  // console.log("Me>>",req.user);
  // if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  // res.json(req.user);
};
