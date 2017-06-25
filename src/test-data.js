const makeTestData = () => {
  const numericValues = [
    0,
    -1,
    2,
    -3,
    4,
    -5,
    5,
    -5,
    5,
    -5,
    4,
    -4,
    4,
    -4,
    3,
    -3,
    3,
    -2,
    2,
    -1,
    null,
    0,
    0,
    0,
    0,
    40,
    -40,
    40,
    -40,
    35,
    -35,
    35,
    -35,
    35,
    -30,
    30,
    -30,
    30,
    -25,
    25,
    -25,
    25,
    -20,
    null,
    20,
    null,
    -20
  ]

  const boolean = R.pipe(
    R.split(''),
    R.map(c => (c === 'n' ? null : c === 't'))
  )('ttttfftftftftffnnftftftnfttftffftnnntttttf')

  const wrap = f => v => (v === null ? null : f(v))

  const nonnegative = R.map(wrap(Math.abs), numericValues)
  const nonpositive = R.map(wrap(n => -n), nonnegative)
  const highpositive = R.map(wrap(n => n + 50), nonnegative)
  const highnegative = R.map(wrap(n => n - 50), nonpositive)
  const sorted = R.sortWith([U.nullsUp, N.numericalOrder], numericValues)
  return {
    mixed: numericValues,
    sorted,
    nonnegative,
    nonpositive,
    highpositive,
    highnegative,
    boolean
  }
}

const testData = makeTestData()
