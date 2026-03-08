import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyGoogleIdToken } from '../controllers/google.controller';
// import bcrypt from 'bcrypt'
// import AuthPayload from '../models/auth.model';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';
const JWT_EXPIRES = '7d';

export const register = async (data: any) => {
  // create user via user service logic would be nicer, but keep simple
  const user = new User(data);
  await user.save();
  return user;
};

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

    const appUserId = googleUser.sub;

    const token = jwt.sign(
      {
        sub: appUserId,
        email: googleUser.email,
        name: googleUser.name,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return ({
      status: true,
      token,
      user: {
        id: appUserId,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
    });
  } catch (err) {
    console.error('Google auth error:', err);
    return {status: false, message:"Invalid Google token"};
  }
}

// export const login = async (username: string, password: string) => {
//   const user = await User.findOne({ username }).populate('roles');
//   if (!user) return null;
  
//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return null;
  
//   const payload: AuthPayload = { username: user.username, email: user.email || '', roles: user.roles };
//   const token = jwt.sign(payload as any, JWT_SECRET, { expiresIn: JWT_EXPIRES });
//   return { user, token };
// };
