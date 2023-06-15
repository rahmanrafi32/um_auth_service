import { Schema, model } from 'mongoose'
const AcademicDepartmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'Academic Faculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    versionKey: false,
  }
)

export const AcademicDepartment = model(
  'Academic Department',
  AcademicDepartmentSchema
)
