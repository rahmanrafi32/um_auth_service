import { User } from './user.model';
import { generateRandomPass, generateStudentId } from './user.utils';
import ApiError from '../../../errors/ApiError';
import { IStudent } from '../students/students.interface';
import { IUser } from './user.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { ClientSession, startSession } from 'mongoose';
import { Student } from '../students/students.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // generate student id
  let newUserAllData = null;
  const session: ClientSession = await startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    user.password = await generateRandomPass();
    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const userService = {
  createStudent,
};
