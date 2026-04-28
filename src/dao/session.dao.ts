import Session, { ISession } from '../models/session.model';

export const findAll = async (): Promise<ISession[]> => {
  return await Session.find().lean().exec();
};

export const findById = async (id: string): Promise<ISession | null> => {
  return await Session.findById(id).lean().exec();
};

export const findByEmail = async (email: string): Promise<ISession | null> => {
  return await Session.findOne({ email:email }).lean().exec();
};

export const createSession = async (data: Partial<ISession>): Promise<ISession> => {
  const session = new Session(data);
  return await session.save();
};

export const updateSession = async (id: string, payload: Partial<ISession>): Promise<ISession | null>  => {
  return await Session.findByIdAndUpdate({ _id: id }, payload, { new: true }).lean().exec();
};

export const deleteSession = async (id: string): Promise<boolean> => {
  const result = await Session.findByIdAndDelete({ _id: id }).exec();
  return !!result;
};