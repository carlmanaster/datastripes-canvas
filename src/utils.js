const U = {
  nullsUp: (a, b) => {
    if (a === null && b === null) return 0
    if (a === null) return -1
    if (b === null) return 1
    return 0
  },
  trueUp: (a, b) => {
    if (a === b) return 0
    return a ? -1 : 1
  },
  compare: (a, b) => R.comparator((a, b) => a - b),
  nonNull: A => R.filter(n => n !== null, A)
}

const N = {
  max: A => R.reduce(R.max, -Infinity, U.nonNull(A)),
  min: A => R.reduce(R.min, Infinity, U.nonNull(A)),
  numericalOrder: (a, b) => a - b,
  sum: A => R.reduce(R.add, 0, U.nonNull(A)),
  mean: A => N.sum(A) / U.nonNull(A).length,

  standardDeviation: A => {
    const V = U.nonNull(A)
    const mean = N.mean(V)
    const n = V.length
    const fn = (a, b) => a + Math.pow(b - mean, 2)
    const sum = R.reduce(fn, 0, V)
    return Math.sqrt(sum / n)
  },
}

const G = {
  line: (color, xStart, xEnd, y, ctx) => {
    const width = xEnd - xStart
    ctx.fillStyle = color
    ctx.fillRect(xStart, y, width, 1)
  },
  verticalLine: (color, x, yStart, yEnd, ctx) => {
    const height = yEnd - yStart
    ctx.fillStyle = color
    ctx.fillRect(x, yStart, 1, height)
  },
  rect: (color, x, y, width, height, ctx) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
  }
}
