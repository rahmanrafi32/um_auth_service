import { Student } from './students.model';
import { IStudent, IStudentFilters } from './students.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { SortOrder, startSession } from 'mongoose';
import { User } from '../users/user.model';
import { paginationOption } from '../../../interfaces/paginationOption';
import { GenericResponse } from '../../../interfaces/commonErrorResponse';
import calculatePagination from '../../../helper/paginationHelper';
import { studentSearchableFields } from './students.constants';
import generateAndCondition from '../../../helper/generateAndCondition';
import updateData from '../../../helper/updateData';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: paginationOption
): Promise<GenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  let andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  andConditions = generateAndCondition(filtersData);

  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ({
  //       [field]: value,
  //     })),
  //   });
  // }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getStudentById = async (id: string): Promise<IStudent | null> => {
  return Student.findOne({ id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudentData: Partial<IStudent> = { ...studentData };

  // if (name && Object.keys(name).length > 0) {
  //   Object.keys(name).forEach((key) => {
  //     const nameKey = `name.${key}` as keyof Partial<IStudent>; // `name.fisrtName`
  //     (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
  //   });
  // }
  // if (guardian && Object.keys(guardian).length > 0) {
  //   Object.keys(guardian).forEach((key) => {
  //     const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // `guardian.fisrtguardian`
  //     (updatedStudentData as any)[guardianKey] =
  //       guardian[key as keyof typeof guardian];
  //   });
  // }
  // if (localGuardian && Object.keys(localGuardian).length > 0) {
  //   Object.keys(localGuardian).forEach((key) => {
  //     const localGuradianKey =
  //       `localGuardian.${key}` as keyof Partial<IStudent>; // `localGuardian.fisrtName`
  //     (updatedStudentData as any)[localGuradianKey] =
  //       localGuardian[key as keyof typeof localGuardian];
  //   });
  // }

  updateData(name, 'name', updatedStudentData);
  updateData(guardian, 'guardian', updatedStudentData);
  updateData(localGuardian, 'localGuardian', updatedStudentData);

  return Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await startSession();

  try {
    session.startTransaction();
    //delete student first
    const student = await Student.findOneAndDelete({ id }, { session });
    if (!student) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ id });
    await session.commitTransaction();
    await session.endSession();

    return student;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};

export const studentService = {
  getStudentById,
  getAllStudents,
  deleteStudent,
  updateStudent,
};
