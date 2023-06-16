import { User } from './user.model';
import { academicSemester } from '../academicSemester/academicSemester.interface';

export const findLastStudentId = async (): Promise<string | null> => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : null;
};

export const findLastFacultyId = async (): Promise<string | null> => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty?.id.substring(2) : null;
};

export const findLastAdminId = async (): Promise<string | null> => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin?.id.substring(2) : null;
};

export const generateStudentId = async (
  academicSemester: academicSemester
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  const incrementID = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return `${academicSemester.year.substring(2)}-${
    academicSemester.code
  }-${incrementID}`;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  const incrementID = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return `F-${incrementID}`;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  const incrementID = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return `A-${incrementID}`;
};

export const generateRandomPass = async (): Promise<string> => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
  let password = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
};
