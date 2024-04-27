/**
 * @see http://momentjs.cn/docs/#/displaying/format/
 */
// 年份
export const YEAR = {
  Y: 'Y', // Y 1970 1971 ... 9999 +10000 +10001。对于 9999 年以后的日期，这符合 ISO 8601 标准。
  YY: 'YY', // YY 70 71 ... 29 30
  YYYY: 'YYYY', // YYYY 1970 1971 ... 2029 2030
}
// 月份
export const MONTH = {
  M: 'M', // M 1 2 ... 11 12
  Mo: 'Mo', // Mo 1st 2nd ... 11th 12th
  MM: 'MM', // MM 01 02 ... 11 12
  MMM: 'MMM', // MMM Jan Feb ... Nov Dec
  MMMM: 'MMMM', // MMMM January February ... November December
}
// 月份的日期
export const DAY = {
  D: 'D', // 1 2 ... 30 31
  Do: 'Do', // 1st 2nd ... 30th 31st
  DD: 'DD', // 01 02 ... 30 31
}
// 小时
export const HOUR = {
  H: 'H', // H 0 1 ... 22 23
  HH: 'HH', // HH 00 01 ... 22 23
  h: 'h', // h 1 2 ... 11 12
  hh: 'hh', // hh 01 02 ... 11 12
  k: 'k', // k 1 2 ... 23 24
  kk: 'kk', // kk 01 02 ... 23 24
}
// 分钟
export const MINUTE = {
  m: 'm', // m 0 1 ... 58 59
  mm: 'mm', // mm 00 01 ... 58 59
}
// 秒
export const SECOND = {
  s: 's', // s 0 1 ... 58 59
  ss: 'ss', // ss 00 01 ... 58 59
}
// 星期几
export const WEEKDAY = {
  d: 'd', // d 0 1 ... 5 6
  do: 'do', // do 0th 1st ... 5th 6th
  dd: 'dd', // dd Su Mo ... Fr Sa
  ddd: 'ddd', // ddd Sun Mon ... Fri Sat
  dddd: 'dddd', // dddd Sunday Monday ... Friday Saturday
}

export const YEAR_MONTH = `${YEAR.Y}-${MONTH.MM}`

export const DATE = `${YEAR_MONTH}-${DAY.DD}`

export const TIME = `${HOUR.HH}:${MINUTE.mm}:${SECOND.ss}`

export const DATE_TIME = `${DATE} ${TIME}`

// Unix 时间戳 1360013296；新增于 2.0.0
export const UNIX_TIMESTAMP = 'X'

// Unix 毫秒时间戳 1360013296123；新增于 2.8.4
export const UNIX_MS_TIMESTAMP = 'x'
