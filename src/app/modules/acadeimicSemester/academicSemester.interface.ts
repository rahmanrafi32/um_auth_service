export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type academicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';

export type academicSemesterCode = '01' | '02' | '03';

export type academicSemester = {
  title: academicSemesterTitle;
  year: string;
  code: academicSemesterCode;
  startMonth: Month;
  endMonth: Month;
};

export type semesterCodeMapper = {
  [key: string]: string;
};

export type academicSemesterFilter = {
  searchTerm: string;
};
