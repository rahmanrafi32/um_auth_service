import express, { Router } from 'express'
import { userRoute } from '../modules/users/user.route'
import { semesterRoute } from '../modules/acadeimicSemester/academicSemester.route'
import { routerMap } from '../../interfaces/routerMap'

const router: Router = express.Router()

const moduleRoutes: routerMap[] = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/academic-semester',
    route: semesterRoute,
  },
]

moduleRoutes.forEach((route: routerMap): void => {
  router.use(route.path, route.route)
})

export default router
