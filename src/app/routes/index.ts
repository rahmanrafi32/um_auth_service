import express, { Router } from 'express';
import { userRoute } from '../modules/users/user.route';
import { semesterRoute } from '../modules/academicSemester/academicSemester.route';
import { routerMap } from '../../interfaces/routerMap';
import { departmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { studentsRoutes } from '../modules/students/students.routes';
import { facultyRoutes } from '../modules/faculties/faculties.routes';
import { adminRoutes } from '../modules/admins/admins.routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { authRoutes } from '../modules/auth/auth.routes';

const router: Router = express.Router();

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
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: departmentRoutes,
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/students',
    route: studentsRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route: routerMap): void => {
  router.use(route.path, route.route);
});

export default router;
