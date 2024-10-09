export const useFormatDate = (date: Date) => {
  const year = date.getFullYear()
  const month =
    date.getMonth() > 10 ? date.getMonth() : '0' + (date.getMonth() + 1)
  const day = date.getDate() > 10 ? date.getDate() : '0' + (date.getDate() + 1)
  const hour = date.getHours() > 10 ? date.getHours() : '0' + date.getHours()
  const minute =
    date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()

  return `${year}-${month}-${day}T${hour}:${minute}`
}
