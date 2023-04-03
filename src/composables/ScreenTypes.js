export const ScreenTypes = Object.freeze({
  SCREEN: 1,
  TRANSACTION: 2,
  LOGIN: 0,
  ERROR: 4
})

const ScreenTypeList = Object.freeze({
  students: ScreenTypes.SCREEN,
  studentinfo: ScreenTypes.SCREEN,
  enrollmentstart: ScreenTypes.TRANSACTION,
  enrollmentpayment: ScreenTypes.TRANSACTION,
  enrollmentconfirm: ScreenTypes.TRANSACTION,
  enrollmentcomplete: ScreenTypes.TRANSACTION
})

export function getScreenType(screen) {
  let scType = ScreenTypeList[screen]

  if (scType !== null || scType !== '') {
    console.log(screen + '-> ' + scType)
    return scType
  }

  return ScreenTypes.SCREEN
}
