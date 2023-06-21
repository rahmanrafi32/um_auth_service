import { Types } from 'mongoose';

type FiltersData = {
  [key: string]: string | Types.ObjectId | undefined;
};
const generateAndConditions = (filtersData: FiltersData) => {
  const andConditions = [];

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  return andConditions;
};

export default generateAndConditions;
