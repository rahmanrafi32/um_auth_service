import { User } from './user.model';
import { IUser } from './user.interface';
import { generateRandomPass } from './user.utils';
import ApiError from '../../../errors/ApiError';

export const createUsers = async (payload: IUser) => {
  // payload.id = await generateStudentId();
  payload.password = await generateRandomPass();
  const createdUser = await User.create(payload);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user.');
  } else return createdUser;
};
