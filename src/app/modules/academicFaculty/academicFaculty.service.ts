import {
  academicFaculty,
  academicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import { paginationOption } from '../../../interfaces/paginationOption';
import calculatePagination from '../../../helper/paginationHelper';
import { academicFacultySearchableFields } from './academicFaculty.constants';
import { SortOrder } from 'mongoose';
import { GenericResponse } from '../../../interfaces/commonErrorResponse';
import generateAndCondition from '../../../helper/generateAndCondition';

const createFaculty = async (
  payload: academicFaculty
): Promise<academicFaculty> => {
  return AcademicFaculty.create(payload);
};

const getAllFaculties = async (
  filters: academicFacultyFilters,
  paginationOptions: paginationOption
): Promise<GenericResponse<academicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  let andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableFields.map((field) => ({
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

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<academicFaculty | null> => {
  return AcademicFaculty.findById(id);
};

const updateFaculty = async (
  id: string,
  payload: Partial<academicFaculty>
): Promise<academicFaculty | null> => {
  return AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};

const deleteByIdFromDB = async (
  id: string
): Promise<academicFaculty | null> => {
  return AcademicFaculty.findByIdAndDelete(id);
};
export const academicFacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteByIdFromDB,
};
