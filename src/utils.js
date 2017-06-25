const U = {
  nullsUp: (a, b) => {
    if (a === null && b === null) return 0
    if (a === null) return -1
    if (b === null) return 1
    return 0
  },
  nonNull: A => R.filter(n => n !== null, A)
}

const N = {
  max: A => R.reduce(R.max, -Infinity, U.nonNull(A)),
  min: A => R.reduce(R.min, Infinity, U.nonNull(A)),
  numericalOrder: (a, b) => a - b
}

const G = {
  line: (color, xStart, xEnd, y, ctx) => {
    const width = xEnd - xStart
    ctx.fillStyle = color
    ctx.fillRect(xStart, y, width, 1)
  }
}
