const line = (color, xStart, xEnd, y, ctx) => {
  const width = xEnd - xStart
  ctx.fillStyle = color
  ctx.fillRect(xStart, y, width, 1)
}

const colorFor = v =>
  v >= 0 ? COLOR_BAR_NUMERIC_POSITIVE : COLOR_BAR_NUMERIC_NEGATIVE

const backgroundColorFor = v =>
  v === null ? COLOR_BACKGROUND_NULL : COLOR_BACKGROUND_UNSELECTED

const numericChart = (props, values, ctx) => {
  const EDGE = 10
  const min = N.min(values)
  const max = N.max(values)
  const extent = max - min

  const { width } = props
  const scalePositive = v => v * width / max
  const scaleHighPositive = v => (v - min) * (width - EDGE) / extent + EDGE
  const scaleNegative = v => (v - min) * width / extent
  const scaleHighNegative = v => (v - min) * (width + EDGE) / extent - EDGE
  const scaleMixed = v => (v - min) * width / extent

  const allPositive = min >= 0
  const allNegative = max <= 0
  const isFarFromZero = allPositive ? min / max > 0.25 : max / min > 0.25

  const scaleFor = (min, max) => {
    if (!allPositive && !allNegative) return scaleMixed
    if (allPositive && isFarFromZero) return scaleHighPositive
    if (allPositive) return scalePositive
    if (isFarFromZero) return scaleHighNegative
    return scaleNegative
  }
  const scale = scaleFor(min, max)

  const leftEdgeFor = y => {
    if (!isFarFromZero) return 0
    if (allNegative) return 0
    return y % 4 * EDGE / 8 + EDGE / 2
  }

  const rightEdgeFor = y => {
    if (!isFarFromZero) return 0
    if (allPositive) return 0
    return y % 4 * EDGE / 8 + EDGE / 2
  }

  const originFor = () => {
    if (!isFarFromZero) return 0
    if (allPositive) return min
    return max
  }

  const origin = originFor()

  let y = 0

  const drawBackground = v => {
    const color = backgroundColorFor(v)
    const xStart = 0
    const xEnd = width
    line(color, xStart, xEnd, y, ctx)
  }

  const drawValue = v => {
    const color = colorFor(v)
    const xStart = scale(origin) - leftEdgeFor(y) + rightEdgeFor(y)
    const xEnd = scale(v)
    line(color, xStart, xEnd, y, ctx)
  }

  const drawRow = v => {
    drawBackground(v)
    drawValue(v)
    y++
  }

  R.forEach(drawRow, values)
}
