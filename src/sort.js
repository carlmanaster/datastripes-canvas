// TODO: sort selection alongside (maybe return a transform vector)
const nullUp = (a, b) => {
  if (a[0] === b[0]) return a[1] - b[1]
  if (a[0] === null) return -1
  if (b[0] === null) return 1
  return 0
}

const index = (a, b) => a[1] - b[1]
const trueUp = (a, b) => a[0] === true ? -1 : 1
const numeric = (a, b) => a[0] - b[0]
const strings = (a, b) => a[0] < b[0] ? -1 : 1
const ordinal = keys => (a, b) => keys.indexOf(a[0]) - keys.indexOf(b[0])
const dates = (a, b) => a[0].getTime() - b[0].getTime()

const indexes = v => R.times(R.identity, v.length)
const appendIndexes = v => R.zip(v, indexes(v))
const getIndexes = pairs => R.map(R.nth(1), pairs)
const getValues = pairs => R.map(R.nth(0), pairs)

const transformation = comparator => v => {
  const pairs = appendIndexes(v)
  const s = R.sortWith([nullUp, comparator], pairs)
  return getIndexes(s)
}

const orderedTransformation = {
  boolean: transformation(trueUp),
  numeric: transformation(numeric),
  string: transformation(strings),
  date: transformation(dates),
  ordinal: keys => transformation(ordinal(keys)),
}

const applyTransformation = t => v => {
  let result = []
  for (var i = 0; i < t.length; i++) {
    result.push(v[t[i]])
  }
  return result
}

const reorderData = (t, data) => {
  const reorder = applyTransformation(t)
  return R.map(d => {
    const { name, props, values } = d
    return { name, props, values: reorder(values) }
  }, data)
}
/*
   Sort by the field, with nulls at the top, stably
*/
const numericTransformation = (data, index) => {
  const { values } = data[index]
  return orderedTransformation.numeric(values)
}

const booleanTransformation = (data, index) => {
  const { values } = data[index]
  return orderedTransformation.boolean(values)
}

const ordinalTransformation = (data, index) => {
  const { props, values } = data[index]
  const { keys } = props
  return orderedTransformation.ordinal(keys)(values)
}

const dateTransformation = (data, index) => {
  const { values } = data[index]
  return orderedTransformation.date(values)
}

const getTransformation = (data, index) => {
  const d = data[index]
  const type = d.props.type
  switch (type) {
    case 'numeric': return numericTransformation(data, index)
    case 'boolean': return booleanTransformation(data, index)
    case 'ordinal': return ordinalTransformation(data, index)
    case 'date': return dateTransformation(data, index)
  }
}
