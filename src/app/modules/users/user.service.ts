import { User } from './user.model'
import { IUser } from './user.interface'
import { generateRandomPass, generateUserId } from './user.utils'

export const createUsers = async (payload: IUser) => {
  try {
    payload.id = await generateUserId()
    payload.password = await generateRandomPass()
    return await User.create(payload)
  } catch (err) {
    console.error('Failed to create user.')
  }
}
