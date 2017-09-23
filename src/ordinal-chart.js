const ordinalChart = (props, values, ctx) => {
  const { width, isSelected, keys } = props
  const barWidth = width / keys.length - 1

  const startFor = b => keys.indexOf(b) * (barWidth + 1)

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
    const xStart = startFor(v)
    const xEnd = xStart + barWidth
    G.line(COLOR_BAR_ORDINAL, xStart, xEnd, y, ctx)
  }

  let y = 0
  const drawRow = v => {
    drawBackground(v)
    drawValue(v)
    y++
  }

  R.forEach(drawRow, values)
}
