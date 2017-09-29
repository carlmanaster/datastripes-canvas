const booleanOverviewChart = (props, values, ctx) => {
  const HEIGHT = 14
  const BINS = 10
  const COLOR = 'black'
  const { width, isSelected } = props

  let count = 0
  let trueCount = 0
  for (var i = 0; i < values.length; i++) {
    if (!isSelected(i)) continue
    count++
    const b = values[i]
    if (b === null) continue
    if (b) trueCount++
  }

  const x = width * trueCount / count
  G.verticalLine(COLOR, x, 0, HEIGHT, ctx)
}
