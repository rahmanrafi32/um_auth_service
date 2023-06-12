import { model, Schema } from 'mongoose'
import { academicSemester } from './academicSemester.interface'
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const academicSemesterSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })

  if (isSemesterExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semester is already exist.'
    )
  }

  next()
})

export const AcademicSemester = model<academicSemester>(
  'AcademicSemester',
  academicSemesterSchema
)
