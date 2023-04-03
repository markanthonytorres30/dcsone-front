const Courses = Object.freeze({
  BSIT: 'BSIT',
  BSIS: 'BSIS',
  BSCS: 'BSCS',
  BSEMC: 'BSEMC'
})

export const YearLevel = Object.freeze({
  ONE: 'First Year',
  TWO: 'Second Year',
  THREE: 'Third Year',
  FOUR: 'Fourth Year'
})

export const EnrollmentTypeName = Object.freeze({
  NEW: 'New Student',
  CONTINUING: 'Continuing Student',
  RETURNEE: 'Returning Student',
  TRANSFEREE: 'Transferee Student'
})

export const EnrollmentTypeRadio = Object.freeze({
  NEW: { label: 'New Student', val: 1 },
  CONTINUING: { label: 'Continuing Student', val: 2 },
  RETURNEE: { label: 'Returning Student', val: 3 },
  TRANSFEREE: { label: 'Transferee Student', val: 4 }
})

export const EnrollmentType = Object.freeze({
  NEW: 1,
  CONTINUING: 2,
  RETURNEE: 3,
  TRANSFEREE: 4
})

export const YearLevel_Index = Object.freeze({
  'First Year': 1,
  'Second Year': 2,
  'Third Year': 3,
  'Fourth Year': 4
})

export const Courses_Name = Object.freeze({
  BSIT: 'Bachelor of Science in Information Technology',
  BSIS: 'Bachelor of Science in Information Systems',
  BSCS: 'Bachelor of Science in Computer Science',
  BSEMC: 'Bachelor of Science in Entertainment and Multimedia Computing'
})

export function getCourse(course) {
  switch (course) {
    case Courses.BSIT:
      return Courses_Name.BSIT
    case Courses.BSIS:
      return Courses_Name.BSIS
    case Courses.BSCS:
      return Courses_Name.BSCS
    case Courses.BSEMC:
      return Courses_Name.BSEMC
  }

  return 'No available course.'
}

export function getCourseCode(course) {
  switch (course) {
    case Courses_Name.BSIT:
    case Courses_Name.BSIS:
    case Courses_Name.BSCS:
    case Courses_Name.BSEMC:
      return Object.keys(Courses_Name)[Object.values(Courses_Name).indexOf(course)]
    default:
      return null
  }
}

export function getLevelCode(level) {
  switch (level) {
    case YearLevel.ONE:
    case YearLevel.TWO:
    case YearLevel.THREE:
    case YearLevel.FOUR:
      return YearLevel_Index[level]
    default:
      return null
  }
}

export function getLevel(level) {
  switch (level) {
    case 1:
      return YearLevel.ONE
    case 2:
      return YearLevel.TWO
    case 3:
      return YearLevel.THREE
    case 4:
      return YearLevel.FOUR
  }

  return 'No available data.'
}

export function getEnrollType(type) {
  switch (type) {
    case 1:
      return EnrollmentTypeName.NEW
    case 2:
      return EnrollmentTypeName.CONTINUING
    case 3:
      return EnrollmentTypeName.RETURNEE
    case 4:
      return EnrollmentTypeName.TRANSFEREE
  }

  return 'No available data.'
}
