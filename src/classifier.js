const classify = columnData => {
  const num = a => a === null || (!isNaN(parseFloat(a)) && isFinite(a))
  const isNumber = R.all(num, columnData)
  if (isNumber) return 'numeric'

  // const isDate = R.all(columnData, function(a) {return a === null || _.isDate(a)})
  // if (isDate) return 'date'

  const bool = a => {
    if (a === null) return true
    const s = a.toString().toLowerCase()
    return s === 'true' || s === 'false'
  }
  const isBoolean = R.all(bool, columnData)
  if (isBoolean) return 'boolean'

  return 'ordinal'
}
