import { IStudent } from '../app/modules/students/students.interface';

const updateData = (
  data: object | undefined,
  keyPrefix: string,
  updatedStudentData: Partial<IStudent>
): void => {
  if (data && Object.keys(data).length > 0) {
    Object.keys(data).forEach((key) => {
      const dataKey = `${keyPrefix}.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as never)[dataKey] = data[key as keyof typeof data];
    });
  }
};

export default updateData;
