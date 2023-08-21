import { User } from './user.model';
import {
  generateFacultyId,
  generateRandomPass,
  generateStudentId,
} from './user.utils';
import ApiError from '../../../errors/ApiError';
import { IStudent } from '../students/students.interface';
import { IUser } from './user.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { ClientSession, startSession } from 'mongoose';
import { Student } from '../students/students.model';
import httpStatus from 'http-status';
import { IFaculty } from '../faculties/faculties.interface';
import { Faculty } from '../faculties/faculties.model';
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;
  const session: ClientSession = await startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    user.student = newStudent[0]._id;
    user.password = await generateRandomPass();
    console.log('user password', user.password);

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

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  user.password = await generateRandomPass();
  console.log('user password', user.password);

  user.role = 'faculty';

  let newUserAllData = null;
  const session = await startSession();
  try {
    session.startTransaction();

    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculties ');
    }

    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculties');
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
      path: 'faculty',
      populate: [
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

// const createAdmin = async (
//   admin: IAdmin,
//   user: IUser
// ): Promise<IUser | null> => {
//   // default password
//   if (!user.password) {
//     user.password = config.default_admin_pass as string;
//   }
//   // set role
//   user.role = 'admin';
//
//   // generate faculties id
//   let newUserAllData = null;
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//
//     const id = await generateAdminId();
//     user.id = id;
//     admin.id = id;
//
//     const newAdmin = await AdminM.create([admin], { session });
//
//     if (!newAdmin.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculties ');
//     }
//
//     user.admin = newAdmin[0]._id;
//
//     const newUser = await User.create([user], { session });
//
//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admins');
//     }
//     newUserAllData = newUser[0];
//
//     await session.commitTransaction();
//     await session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw error;
//   }
//
//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'admin',
//       populate: [
//         {
//           path: 'managementDepartment',
//         },
//       ],
//     });
//   }
//
//   return newUserAllData;
// };

export const userService = {
  createStudent,
  createFaculty,
  // createAdmin,
};
