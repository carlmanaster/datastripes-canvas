const booleanChart = (props, values, ctx) => {
  const { width, isSelected } = props

  const colorFor = b => (b ? COLOR_BAR_BOOLEAN_TRUE : COLOR_BAR_BOOLEAN_FALSE)
  const startFor = b => (b ? width : 0)

  const backgroundColorFor = v => {
    if (v === null) return COLOR_BACKGROUND_NULL
    if (isSelected(y)) return COLOR_BACKGROUND_SELECTED
    return COLOR_BACKGROUND_UNSELECTED
  }

  const drawBackground = v => {
    const color = backgroundColorFor(v)
    G.line(color, 0, width, y, ctx)
  }

  const drawValue = v => {
    if (v === null) return
    const color = colorFor(v)
    const xStart = startFor(v)
    const xEnd = width / 2
    G.line(color, xStart, xEnd, y, ctx)
  }

  let y = 0
  const drawRow = v => {
    drawBackground(v)
    drawValue(v)
    y++
  }

  R.forEach(drawRow, values)
}
