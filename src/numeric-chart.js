const numericChart = (props, values, ctx) => {
  const colorFor = v =>
    v >= 0 ? COLOR_BAR_NUMERIC_POSITIVE : COLOR_BAR_NUMERIC_NEGATIVE

  const EDGE = 10
  const min = N.min(values)
  const max = N.max(values)
  const extent = max - min

  const { width, isSelected } = props
  const scalePositive = v => v * width / max
  const scaleHighPositive = v => (v - min) * (width - EDGE) / extent + EDGE
  const scaleNegative = v => (v - min) * width / extent
  const scaleHighNegative = v => (v - min) * (width - EDGE) / extent
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

  const jag = y => y % 4 * EDGE / 8 + EDGE / 2

  const backgroundColorFor = v => {
    if (v === null) return COLOR_BACKGROUND_NULL
    if (isSelected(y)) return COLOR_BACKGROUND_SELECTED
    return COLOR_BACKGROUND_UNSELECTED
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
    G.line(color, 0, width, y, ctx)
  }

  const startFor = () => {
    if (!isFarFromZero && !allNegative) return scale(origin)
    if (!isFarFromZero && allNegative) return width
    if (!allNegative) return scale(origin) - jag(y)
    return scale(origin) + jag(y)
  }

  const drawValue = v => {
    if (v === null) return
    const color = colorFor(v)
    const xStart = startFor()
    const xEnd = scale(v)
    G.line(color, xStart, xEnd, y, ctx)
  }

  const drawRow = v => {
    drawBackground(v)
    drawValue(v)
    y++
  }

  R.forEach(drawRow, values)
}
