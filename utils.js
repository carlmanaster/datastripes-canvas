const U = {
  nullsUp: (a, b) => {
    if (a === null && b === null) return 0
    if (a === null) return -1
    if (b === null) return 1
    return 0
  }
}

const N = {
  max: A => R.reduce(R.max, -Infinity, A),
  min: A => R.reduce(R.min, Infinity, A),
  numericalOrder: (a, b) => a - b
}
