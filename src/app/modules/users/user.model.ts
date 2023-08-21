import { model, Schema } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

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
      select: 0, //for hide password from response
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.static('isUserExist', async function (id: string): Promise<
  Partial<IUser | null>
> {
  return User.findOne(
    { id },
    {
      id: 1,
      needsPasswordChange: 1,
      password: 1,
      role: 1,
    }
  );
});

userSchema.static(
  'isPasswordMatched',
  async function (givenPass: string, savedPass: string): Promise<boolean> {
    return bcrypt.compare(givenPass, savedPass);
  }
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  if (!this.needsPasswordChange) {
    this.passwordChangedAt = new Date();
  }
  next();
});

export const User = model<IUser, IUserModel>('User', userSchema);
