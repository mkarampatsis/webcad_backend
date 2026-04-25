import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { verifyGoogleIdToken } from '../controllers/google.controller';
import * as userService from './user.service';
import { config } from '../config/env';
// import AuthPayload from '../models/auth.model';

const JWT_SECRET = config.jwtSecret;

export const googleLogin = async(idToken:string) =>{
  try {
    if (!idToken) {
      // return res.status(400).json({ error: 'Missing idToken' });
      return {status: false, message:"Missing idToken"};
    }

    const googleUser = await verifyGoogleIdToken(idToken);

    if (!googleUser.email_verified) {
      return {status: false, message:"Email not verified"};
    }
    
    let user = await userService.findUserByEmail(googleUser.email!);
    if (!user) {
      user = await userService.createGoogleUser({
        email: googleUser.email!,
        name: googleUser.name || 'Google User',
        photoUrl: googleUser.picture || '',
        userId: googleUser.sub
      });
    }
      
    const token = jwt.sign(
      {
        userId: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        photoUrl: googleUser.picture,
        roles: user.roles
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return ({
      status: true,
      token
    });
  } catch (err) {
    console.error('Google auth error:', err);
    return {status: false, message:"Invalid Google token"};
  }
}

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).populate('roles');
  if (!user) return {status: false, message:"User not found"};
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) return {status: false, message:"Invalid credentials"};
  
  const token = jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      name: user.name,
      photoUrl: user.photoUrl,
      roles: user.roles
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  return ({
    status: true,
    token
  });
};
