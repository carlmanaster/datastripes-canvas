const convert = (type, strings) => {
  if (type === 'ordinal') {
    const keys = R.uniq(strings).sort()
    const values = R.map(toString, strings)
    return { values, keys }
  }

  if (type === 'boolean') {
    const values = R.map(toBool, strings)
    return { values }
  }

  if (type === 'numeric') {
    const values = R.map(toNumber, strings)
    return { values }
  }
}
