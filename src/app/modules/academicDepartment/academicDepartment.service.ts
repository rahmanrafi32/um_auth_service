import {
  academicDepartment,
  academicDepartmentFilters,
} from './academicDepartment.interface';
import { academicDepartmentSearchableFields } from './academicDepartment.constants';
import { paginationOption } from '../../../interfaces/paginationOption';
import { GenericResponse } from '../../../interfaces/commonErrorResponse';
import calculatePagination from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';
import { AcademicDepartment } from './academicDepartment.model';
import generateAndCondition from '../../../helper/generateAndCondition';

const getAllDepartments = async (
  filters: academicDepartmentFilters,
  paginationOptions: paginationOption
): Promise<GenericResponse<academicDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  let andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
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

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createDepartment = async (
  payload: academicDepartment
): Promise<academicDepartment | null> => {
  return (await AcademicDepartment.create(payload)).populate('academicFaculty');
};

const getSingleDepartment = async (
  id: string
): Promise<academicDepartment | null> => {
  return AcademicDepartment.findById(id).populate('academicFaculty');
};

const updateDepartment = async (
  id: string,
  payload: Partial<academicDepartment>
): Promise<academicDepartment | null> => {
  return AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('academicFaculty');
};

const deleteDepartment = async (
  id: string
): Promise<academicDepartment | null> => {
  return AcademicDepartment.findByIdAndDelete(id);
};

export const academicDepartmentService = {
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartment,
};
