import { User, IUser } from '../models/User';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const createUser = async (data: IUser) => {
  // create user via user service logic would be nicer, but keep simple
  console.log('Creating user with data:', data);
  if (data.password) {
    const hash = await bcrypt.hash(data.password, SALT_ROUNDS);
    data.password = hash;
  }

  const user  = new User({  
    userId: new Date().getTime().toString(), // simple unique ID generation
    email: data.email,
    name: data.name,
    password: data.password, // In production, hash the password before saving
    roles: ['user'] // default role
  });
  
  await user.save();
  return user;
};