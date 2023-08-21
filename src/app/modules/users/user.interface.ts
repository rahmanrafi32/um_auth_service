import { Model, Types } from 'mongoose';
import { IStudent } from '../students/students.interface';

export type IUser = {
  id: string | undefined;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
  needsPasswordChange: boolean;
  passwordChangedAt: Date;
};

export type IUserModel = {
  isUserExist(id: string): Promise<Partial<IUser>>;
  isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>;
} & Model<IUser>;
