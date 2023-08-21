import { SortOrder } from 'mongoose';
import { managementDepartmentSearchableFields } from './managementDepartment.constant';
import { ManagementDepartment } from './managementDepartment.model';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.inteface';
import calculatePagination from '../../../helper/paginationHelper';
import { GenericResponse } from '../../../interfaces/commonErrorResponse';
import { paginationOption } from '../../../interfaces/paginationOption';

const createDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  return ManagementDepartment.create(payload);
};

const getSingleDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

const getAllDepartments = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: paginationOption
): Promise<GenericResponse<IManagementDepartment[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  return ManagementDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};

const deleteDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  return ManagementDepartment.findByIdAndDelete(id);
};

export const ManagementDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
