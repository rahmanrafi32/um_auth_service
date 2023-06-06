import { RequestHandler } from 'express'
import { createUsers } from './user.service'

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await createUsers(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
