import User, { IUser } from '../models/user.model';
import Role, { IRole } from '../models/role.model';
import * as userDAO from '../dao/user.dao';
import * as userDTO from '../dto/user.dto';
import * as userService from './user.service';
import { Types } from 'mongoose';

// import { toUserResponseDTO } from '../mappers/user.mapper';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '', 10);


export const findUsers = async () => {
  const users = await userDAO.findAll();
  // return users.map(u => toUserResponseDTO(u));
  return users;
};

export const findUserById = async (id: string) => {
  const user = await userDAO.findById(id);
  if (user) {
    // return toUserResponseDTO(user);
    return user; 
  }    
};

export const findUserByEmail = async (email: string) => {
  const user = await userDAO.findByEmail(email);
  if (user) {
    // return toUserResponseDTO(user);
    return user; 
  }
};

export const createRegisteredUser = async (data: userDTO.CreateRegisteredUserDTO) => {
  console.log('Creating Registered user with data:', data.email);
  if (data.password) {
    const hash = await bcrypt.hash(data.password, SALT_ROUNDS);
    data.password = hash;
  }

  let roleIds: Types.ObjectId[] = [];
  if (data.roles && data.roles.length > 0) {
    roleIds = data.roles.map(id => new Types.ObjectId(id));
  } else {
    let reader: IRole | null = await Role.findOne({ role: 'READER' });
    if (!reader) {
      reader = await Role.create({ role: 'READER', description: 'Default reader role', active: true });
    }
    roleIds = [reader._id];
  }

  const user = await userDAO.createUser({
    ...data,
    userId: new Date().getTime().toString(),
    roles: roleIds
  });
  return user;
};

export const createGoogleUser = async (data: userDTO.CreateGoogleUserDTO) => {
  console.log('Creating Google user with data:', data.email);
 
  let roleIds: Types.ObjectId[] = [];
  if (data.roles && data.roles.length > 0) {
    roleIds = data.roles.map(id => new Types.ObjectId(id));
  } else {
    let reader: IRole | null = await Role.findOne({ role: 'READER' });
    if (!reader) {
      reader = await Role.create({ role: 'READER', description: 'Default reader role', active: true });
    }
    roleIds = [reader._id];
  }

  const user = await userDAO.createUser({
    ...data,
    roles: roleIds
  });
  return user;
};

export const updateUser = async (username: string, payload: userDTO.UpdateUserDTO) => {
  const updateData: Partial<IUser> = {};

  if (payload.name !== undefined) updateData.name = payload.name;
  if (payload.password) {
    updateData.password = await bcrypt.hash(payload.password, SALT_ROUNDS);
  }

  if (payload.roles) {
    updateData.roles = payload.roles.map(id => new Types.ObjectId(id));
  }

  const user = await userDAO.updateUser(username, updateData);
  // return user ? toUserResponseDTO(user) : null;
  return user;
};

export const deleteUser = async (username: string) => {
  const user = await userDAO.deleteUser(username);
  return user;
};