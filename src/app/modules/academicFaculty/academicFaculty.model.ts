import { model, Schema } from 'mongoose'
import { academicFaculty } from './academicFaculty.interface'

const academicFacultySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const AcademicFaculty = model<academicFaculty>(
  'Academic Faculty',
  academicFacultySchema
)
