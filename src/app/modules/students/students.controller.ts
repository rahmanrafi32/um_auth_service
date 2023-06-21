import returnResponse from '../../../shared/returnResponse';
import { IStudent } from './students.interface';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { studentService } from './students.service';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { studentFilterableFields } from './students.constants';
import { paginationFields } from '../../../constants';

const getAllStudents = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(req.query, studentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await studentService.getAllStudents(
      filters,
      paginationOptions
    );

    returnResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getStudentById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await studentService.getStudentById(req.params.id);

    returnResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieved successfully !',
      data: result,
    });
  }
);

const updateStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await studentService.updateStudent(req.params.id, req.body);

    returnResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student updated successfully !',
      data: result,
    });
  }
);

const deleteStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await studentService.deleteStudent(req.params.id);

    returnResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully !',
      data: result,
    });
  }
);
export const studentsController = {
  getStudentById,
  updateStudent,
  getAllStudents,
  deleteStudent,
};
