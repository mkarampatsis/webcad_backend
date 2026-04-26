import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { CreateRegisteredUserDTO, UpdateUserDTO } from '../dto/user.dto';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.findUsers();
    res.status(200).json(result);
  } catch (err) { 
    next(err);
  }
};

export const getOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id!;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
    const result = await userService.findUserById(id);
    
    if (!result) 
      return res.status(404).json({ message: 'User not found by id' });
    res.status(200).json(result);
  } catch (err) { 
    next(err);
  }
};

export const getOneByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.params.email!;
    
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid email' });
    }
    
    const result = await userService.findUserByEmail(email);
    
    if (!result) 
      return res.status(404).json({ message: 'User not found by email' });
    res.status(200).json(result);
  } catch (err) { 
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: CreateRegisteredUserDTO = req.body;
    
    const existing = await userService.findUserByEmail(data.email);
    if (existing) { 
      return res.status(400).json({ status: false, message: 'User exists' });
    }
    
    const result = await userService.createRegisteredUser(data);
    if (!result) {
      return res.status(404).json({ message: "User not created" });
    }
    
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = req.params.username;
    
    if (!username || typeof username !== 'string') {
      return res.status(400).json({ message: 'Invalid username' });
    }
    
    const data: UpdateUserDTO = req.body;

    const result = await userService.updateUser(username, data);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = req.params.username;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({ message: 'Invalid username' });
    }

    const result = await userService.deleteUser(username);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ deleted: result });
  } catch (err) { 
    next(err);
  }
};