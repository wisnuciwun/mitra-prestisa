export const sortedByFalse = (arr = Array) => {
  return arr.sort((x, y) => {
    return x.isAdd - y.isAdd
  })
}
