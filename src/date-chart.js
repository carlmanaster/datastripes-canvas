const dateChart = (props, values, ctx) => {
  const colorFor = v => COLOR_BAR_DATE

  const EDGE = 10
  const min = D.min(values)
  const max = D.max(values)
  const extent = max - min

  const { width, isSelected } = props
  const scale = v => (v - min) * (width - EDGE) / extent + EDGE

  const backgroundColorFor = v => {
    if (v === null) return COLOR_BACKGROUND_NULL
    if (isSelected(y)) return COLOR_BACKGROUND_SELECTED
    return COLOR_BACKGROUND_UNSELECTED
  }

  let y = 0

  const drawBackground = v => {
    const color = backgroundColorFor(v)
    G.line(color, 0, width, y, ctx)
  }

  const drawValue = v => {
    if (v === null) return
    const color = colorFor(v)
    const xStart = scale(v.getTime()) - 2
    const xEnd = scale(v.getTime())
    G.line(color, xStart, xEnd, y, ctx)
  }

  const drawRow = v => {
    drawBackground(v)
    drawValue(v)
    y++
  }

  R.forEach(drawRow, values)
}
