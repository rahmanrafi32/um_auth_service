import express, { Router } from 'express'
import { userRoute } from '../modules/users/user.route'
import { semesterRoute } from '../modules/academicSemester/academicSemester.route'
import { routerMap } from '../../interfaces/routerMap'
import { facultyRoutes } from '../modules/academicFaculty/academicFaculty.routes'

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
  {
    path: '/academic-faculty',
    route: facultyRoutes,
  },
]

moduleRoutes.forEach((route: routerMap): void => {
  router.use(route.path, route.route)
})

export default router
