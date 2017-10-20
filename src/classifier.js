const classify = columnData => {
  const binary = a => {
    if (a === null || a === '') return true
    return a === '1' || a === '0'
  }
  const isBinary = R.all(binary, columnData)
  if (isBinary) return 'boolean'

  const num = a => a === null || a === '' || (!isNaN(parseFloat(a)) && isFinite(a))
  const isNumber = R.all(num, columnData)
  if (isNumber) return 'numeric'

  const format = detectDateFormat(columnData)
  if (format !== undefined) return 'date'

  const bool = a => {
    if (a === null || a === '') return true
    const s = a.toString().toLowerCase()
    return s === 'true' || s === 'false'
  }
  const isBoolean = R.all(bool, columnData)
  if (isBoolean) return 'boolean'

  return 'ordinal'
}
