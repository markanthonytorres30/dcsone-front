export function formatDate(date) {
  //yyyy-mm-dd
  const formatted_date = new Date(date)

  return formatted_date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function normalCase(data) {
  let data_str = String(data).substring(1, String(data).length)
  return String(data).charAt(0).toUpperCase() + data_str
}

export function isDate(date) {
  try {
    let d = new Date(date)
    return true
  } catch (e) {
    return false
  }
}
