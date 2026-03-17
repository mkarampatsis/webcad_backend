import { User } from '../models/User';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
import { verifyGoogleIdToken } from '../controllers/google.controller';
import bcrypt from 'bcrypt'
// import AuthPayload from '../models/auth.model';

// dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';
const JWT_EXPIRES = '7d';

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
    
    let user = await User.findOne({ userId: googleUser.sub });
    if (!user) {
      user = new User({
        userId: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        photoUrl: googleUser.picture,
        roles: ['user'] // default role
      });
      await user.save();
    } 
    
    const token = jwt.sign(
      {
        userId: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        photoUrl: googleUser.picture,
        roles: user.roles
      },
      process.env.JWT_SECRET as string,
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
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );
  
  return ({
    status: true,
    token
  });
};
