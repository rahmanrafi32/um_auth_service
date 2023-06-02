import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const User = model<IUser>('User', userSchema)
