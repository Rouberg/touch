import isDate from './isDate'
export default function dateFormat (date, format) {
  if (!isDate(date)) {
    date = new Date(date)
  }
  let info = {
    'y+': date.getFullYear(), //  年
    'Y+': date.getFullYear(), //  年
    'M+': date.getMonth() + 1, // 月
    'D+': date.getDate(), // 日
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }

  Object.keys(info).forEach(key => {
    let reg = new RegExp(key)
    if (reg.test(format)) {
      format = format.replace(reg, $0 => info[key].toString().padStart($0.length, '0'))
    }
  })
  return format
}
