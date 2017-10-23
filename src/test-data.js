const makeTestData = () => {
  const wrap = f => v => (v === null ? null : f(v))
  const numericValues = [
    0,
    -1,
    2.2,
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

  const dateStrings = [
    "06/07/2015",
    "06/07/15",
    "16/07/15",
    "16/07/15",
    "n",
    "16/07/15",
    "16/07/15",
    "17/07/15",
    "07/07/15",
    "08/07/15",
    "08/07/15",
    "09/07/15",
    "09/07/15",
    "09/07/15",
    "n",
    "09/07/15",
    "09/07/15",
    "10/07/15",
    "10/07/15",
    "12/07/15",
    "12/07/15",
    "12/07/15",
    "12/07/15",
    "13/07/15",
    "13/07/15",
    "13/07/15",
    "13/07/15",
    "10/07/15",
    "11/07/15",
    "07/07/15",
    "07/07/15",
    "07/07/15",
    "07/07/15",
    "07/07/15",
    "07/07/15",
    "07/07/15",
    "12/07/15",
    "14/07/15",
    "14/07/15",
    "n",
    "16/07/15",
    "16/07/15",
    "17/07/15",
    "17/07/15",
    "17/07/15",
    "n",
    "18/07/15",
  ]

  const dates = R.map(s => (s === 'n' ? null : D.toDate('MM/DD/YYYY')(s)))(dateStrings)
  const sortedDates = R.sortWith([U.nullsUp, D.dateOrder], dates)

  const boolean = R.pipe(
    R.split(''),
    R.map(c => (c === 'n' ? null : c === 't'))
  )('tttttttftftftffnnftftftnfttftffftnnntffttftftft')
  const sortedBoolean = R.sortWith([U.nullsUp, U.trueUp], boolean)

  const ordinal = R.pipe(R.split(''), R.map(c => (c === 'n' ? null : c)))(
    'dnenddabnbababnnccacbacbbabcbabcdeabcdeabcdebba'
  )
  const sortedOrdinal = R.sortWith([U.nullsUp, (a, b) => a > b], ordinal)

  const selection = R.pipe(
    R.split(''),
    R.map(c => (c === 'n' ? null : c === 't'))
  )('fffffftttttttttttttttfffffffffffffffffttfffffff')

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
    boolean,
    sortedBoolean,
    ordinal,
    sortedOrdinal,
    dates,
    sortedDates,
    selection
  }
}

const testData = makeTestData()
