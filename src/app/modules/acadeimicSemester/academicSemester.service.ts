import {
  academicSemester,
  academicSemesterFilter,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import {
  academicSemesterTitleCodeMapper,
  searchableFields,
} from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { paginationOption } from '../../../interfaces/paginationOption';
import calculatePagination from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';
import { genericResponse } from '../../../interfaces/commonErrorResponse';

const createSemester = async (
  payload: academicSemester
): Promise<academicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  return await AcademicSemester.create(payload);
};

const getAllSemesters = async (
  paginationOptions: paginationOption,
  filters: Partial<academicSemesterFilter>
): Promise<genericResponse<academicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((fields) => ({
        [fields]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([fields, value]) => ({
        [fields]: value,
      })),
    });
  }

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSemesterById = async (
  id: string
): Promise<academicSemester | null> => {
  return AcademicSemester.findById(id);
};

const updateSemester = async (
  id: string,
  updateField: Partial<academicSemester>
): Promise<academicSemester | null> => {
  if (
    updateField.title &&
    updateField.code &&
    academicSemesterTitleCodeMapper[updateField.title] !== updateField.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  return AcademicSemester.findOneAndUpdate({ _id: id }, updateField, {
    new: true,
  });
};

const deleteSemester = async (id: string) => {
  return AcademicSemester.findOneAndDelete({ _id: id }, { new: true });
};

export const academicSemesterService = {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
};
