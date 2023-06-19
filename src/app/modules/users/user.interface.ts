import { Types } from 'mongoose';
import { IStudent } from '../students/students.interface';

export type IUser = {
  id: string | undefined;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};
